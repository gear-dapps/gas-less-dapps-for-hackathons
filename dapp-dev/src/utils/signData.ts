import { Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';
import { decodeAddress } from '@polkadot/keyring';

import config from '../config';

const {
  owner: { privateKey, publicKey },
} = config;

const keyring = new Keyring();

export let ownerAccount: KeyringPair;
export let ownerAccountRaw = u8aToHex(decodeAddress(publicKey));

export async function initialize() {
  await waitReady();
  ownerAccount = privateKey.startsWith('//')
    ? keyring.addFromUri(privateKey, {}, 'sr25519')
    : privateKey.startsWith('0x')
    ? keyring.addFromSeed(hexToU8a(privateKey), {}, 'sr25519')
    : keyring.addFromMnemonic(privateKey, {}, 'sr25519');
}

export function signData(params: string): string {
  return u8aToHex(ownerAccount.sign(params));
}
