import { ApiPromise, WsProvider } from '@polkadot/api';
import { u128 } from '@polkadot/types';

import config from '../config';
import { rootAccount } from './rootAcc';
import EventEmitter from 'events';
import { randomUUID } from 'crypto';

const {
  api: { address, value },
} = config;

const provider = new WsProvider(address);

export const api = new ApiPromise({ provider });

const transferEmitter = new EventEmitter();

export const queue = [];

Object.defineProperty(queue, 'push', {
  value: function (v: any) {
    const id = randomUUID();
    this[this.length] = { keys: v, id };
    transferEmitter.emit('push');
    return new Promise((resolve, reject) => {
      transferEmitter.on(`result-${id}`, (result) => {
        if (result.error) {
          reject(result.error);
        } else {
          resolve(result);
        }
      });
    });
  },
});

async function* processQ() {
  while (true) {
    if (queue.length === 0) {
      await new Promise((resolve) => transferEmitter.on('push', resolve));
    }
    const req = queue.shift() as { keys: string[]; id: string };
    if (req) {
      yield req;
    }
  }
}

export async function transferProcess() {
  for await (const { keys, id } of processQ()) {
    const result = {};
    let error = null;
    const filtered = [];

    for (const k of keys) {
      try {
        const {
          data: { free },
        } = (await api.query.system.account(k)) as any;

        if ((free as u128).ltn(Number(config.api.maxLimit))) {
          filtered.push(k);
          continue;
        }
        result[k] = 0;
      } catch (err) {
        error = new Error('Error during getting account balances');
      }
    }

    if (error) {
      transferEmitter.emit(`result-${id}`, { error });
      continue;
    }

    const txs = filtered.map((k) => api.tx.balances.transferKeepAlive(k, value));
    if (txs.length > 0) {
      try {
        await new Promise((resolve, reject) =>
          api.tx.utility.batchAll(txs).signAndSend(rootAccount, ({ events, status }) => {
            if (status.isInBlock) {
              events.forEach(({ event: { data, method } }) => {
                if (method === 'Transfer') {
                  result[data['to'].toHuman()] = data['amount'].toString();
                }
              });
            }

            if (status.isFinalized) resolve(status.asFinalized);
            if (status.isInvalid) reject(null);
          }),
        );
      } catch (err) {
        error = new Error('Error during sending transaction');
      }
    }
    if (error) {
      transferEmitter.emit(`result-${id}`, { error });
      continue;
    }
    transferEmitter.emit(`result-${id}`, result);
  }
}
