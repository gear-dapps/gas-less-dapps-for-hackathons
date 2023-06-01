import { ApiPromise, WsProvider } from '@polkadot/api';

import config from '../config';
import { rootAccount } from '../utils';

const {
  api: { address, value },
} = config;

const provider = new WsProvider(address);

export const api = new ApiPromise({ provider });

export async function transfer(publicKeys: string[]) {
  const txs = publicKeys.map((k) => api.tx.balances.transferKeepAlice(k, value));

  return new Promise((resolve, reject) =>
    api.tx.utility.batchAll(txs).signAndSend(rootAccount, ({ events, status }) => {
      events.forEach((e) => {
        console.log(e.toHuman());
      });
      if (status.isFinalized) resolve(status.asFinalized);
      if (status.isInvalid) reject(null);
    }),
  );
}

export class TransferService {
  private provider: WsProvider;
  private api: ApiPromise;

  constructor() {
    this.provider = new WsProvider(address);
  }

  async transfer(publicKeys: string[]) {
    const txs = publicKeys.map((k) => this.api.tx.balances.transferKeepAlive(k, value));

    return new Promise((resolve, reject) =>
      this.api.tx.utility.batchAll(txs).signAndSend(rootAccount, ({ events, status }) => {
        events.forEach((e) => {
          console.log(e.toHuman());
        });
        if (status.isFinalized) resolve(status.asFinalized);
        if (status.isInvalid) reject(null);
      }),
    );
  }
}
