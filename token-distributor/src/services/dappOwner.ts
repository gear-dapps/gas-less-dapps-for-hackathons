import { decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { Repository } from 'typeorm';

import { IDappOwnerApproveReqBody, IDappOwnerRegisterReqBody } from '../types/index';
import { Dapp, User, dataSource } from '../database/index';
import { verifySignature } from '../utils/index';
import { rootAccountRaw } from '../utils';

export class DappOwnerService {
  private userRepo: Repository<User>;
  private dappRepo: Repository<Dapp>;

  constructor() {
    this.userRepo = dataSource.getRepository(User);
    this.dappRepo = dataSource.getRepository(Dapp);
  }

  async register({ publicKey, signature, email, dappName }: IDappOwnerRegisterReqBody): Promise<User> {
    verifySignature(publicKey, signature);

    const publicKeyRaw = u8aToHex(decodeAddress(publicKey));

    let user = await this.userRepo.findOneBy([{ publicKeyRaw }, { email }]);

    if (user) {
      throw new Error('User has already been registered');
    }

    user = new User({ publicKey, email, publicKeyRaw, dapps: [] });

    const dapp = new Dapp({ name: dappName, owner: user });

    const savedUser = await this.userRepo.save(user);

    await this.dappRepo.save(dapp);

    return savedUser;
  }

  async approve({ signature, publicKey, id }: IDappOwnerApproveReqBody): Promise<User> {
    if (u8aToHex(decodeAddress(publicKey)) !== rootAccountRaw) {
      throw new Error('Forbidden');
    }

    verifySignature(publicKey, signature);

    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new Error(`User not found`);
    }

    user.isApproved = true;

    return this.userRepo.save(user);
  }

  async nonApproved(): Promise<User[]> {
    return this.userRepo.find({ where: { isApproved: false }, relations: { dapps: true } });
  }
}
