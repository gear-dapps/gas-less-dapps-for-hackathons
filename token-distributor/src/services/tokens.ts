import { Repository } from 'typeorm';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

import { User, dataSource } from '../database';
import { ITokensRequestReqBody } from '../types';
import { queue, verifySignature } from '../utils';

export class TokenService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = dataSource.getRepository(User);
  }

  async request({ users, publicKey, signature }: ITokensRequestReqBody) {
    let publicKeyRaw: string;
    try {
      publicKeyRaw = u8aToHex(decodeAddress(publicKey));
    } catch (err) {
      throw new Error('Invalid public key');
    }

    const user = await this.userRepo.findOneBy({ publicKeyRaw });

    if (!user) {
      throw new Error(`User not found`);
    }

    if (!user.isApproved) {
      throw new Error(`Forbidden`);
    }

    verifySignature(publicKey, signature);

    const result = await queue.push(users);

    return result;
  }
}
