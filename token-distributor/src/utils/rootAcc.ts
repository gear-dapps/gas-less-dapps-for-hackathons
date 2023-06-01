import { Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import config from '../config';

const {
  api: { accountSeed },
} = config;

const keyring = new Keyring();

export let rootAccount: KeyringPair;
export let rootAccountRaw: string;

export async function initialize() {
  await waitReady();
  rootAccount = accountSeed.startsWith('//')
    ? keyring.addFromUri(accountSeed, {}, 'sr25519')
    : accountSeed.startsWith('0x')
    ? keyring.addFromSeed(hexToU8a(accountSeed), {}, 'sr25519')
    : keyring.addFromMnemonic(accountSeed, {}, 'sr25519');

  rootAccountRaw = u8aToHex(rootAccount.addressRaw);
}
