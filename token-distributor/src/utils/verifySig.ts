import { signatureVerify } from '@polkadot/util-crypto';

export const verifySignature = (publicKey: string, signature: string) => {
  let isValidSig = false;

  try {
    isValidSig = signatureVerify(publicKey, signature, publicKey).isValid;
    if (!isValidSig) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('Signature is invalid');
  }
};
