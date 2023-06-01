import { ApiPromise, WsProvider } from '@polkadot/api';
import { u128 } from '@polkadot/types';
import { BN } from '@polkadot/util';

import config from '../config';
import { rootAccount } from './rootAcc';
import EventEmitter from 'events';
import { randomUUID } from 'crypto';

const {
  api: { address, value },
} = config;

const provider = new WsProvider(address);

let api: ApiPromise;
let existentialDeposit: BN;

export async function initApi() {
  api = new ApiPromise({ provider });
  await api.isReadyOrError;

  console.log(`Connected to ${(await api.rpc.system.chain()).toString()}`);

  api.on('disconnected', () => {
    reconnect();
  });
  existentialDeposit = (api.consts.balances.existentialDeposit as u128).toBn();
}

async function reconnect() {
  console.log('Reconnecting...');
  try {
    await api.disconnect();
  } catch (err) {
    console.log(err);
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return initApi();
}

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
    const filtered: Record<string, BN> = {};

    for (const k of keys) {
      try {
        const {
          data: { free },
        } = (await api.query.system.account(k)) as unknown as { data: { free: u128 } };

        if (free.lt(value.sub(existentialDeposit))) {
          filtered[k] = value.sub(free);
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

    const txs = Object.entries(filtered).map(([k, v]) => api.tx.balances.transferKeepAlive(k, v));
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
