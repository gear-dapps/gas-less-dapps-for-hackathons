import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User, dataSource } from '../database';
import { ITokenReqBody, IUserGetKeysBody, IUserRegisterBody } from '../types';
import { IsValidPassword, decryptData, encryptData } from '../utils';
import { decodeAddress } from '@gear-js/api';
import config from '../config';

export class UserService {
  repo: Repository<User>;

  constructor() {
    this.repo = dataSource.getRepository(User);
  }

  async register({
    nickname,
    password,
    privateKey,
    publicKey,
  }: IUserRegisterBody): Promise<Omit<User, 'iv' | 'privateKey' | 'password' | 'isAdmin'>> {
    let u = await this.repo.findOneBy({ nickname });

    if (u) {
      throw new Error('User is already registered');
    }

    const { encrypted, iv } = encryptData(password, privateKey);
    const rawAddress = decodeAddress(publicKey);
    u = new User({
      nickname,
      publicKey,
      rawAddress,
      password: await bcrypt.hash(password, 10),
      privateKey: encrypted,
      iv,
    });

    const user = await this.repo.save(u);
    return { nickname, rawAddress, publicKey, id: user.id };
  }

  async getAllPublicKeys(): Promise<string[]> {
    const users = await this.repo.find();

    return users.map(({ publicKey }) => publicKey);
  }

  async getKeys({ nickname, password }: IUserGetKeysBody): Promise<Pick<User, 'publicKey' | 'privateKey'>> {
    const user = await this.repo.findOneBy({ nickname });

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await IsValidPassword(password, user.password))) {
      throw new Error('Wrong password');
    }

    const privateKey = decryptData(password, user.privateKey, user.iv);

    return { privateKey, publicKey: user.publicKey };
  }

  async isAdmin({ password, publicKey }: Partial<IUserRegisterBody>): Promise<boolean> {
    const pkRawAdmin = decodeAddress(config.owner.publicKey);
    const pkRawReq = decodeAddress(publicKey);

    if (pkRawReq !== pkRawAdmin) {
      throw new Error('Forbidden');
    }

    let admin = await this.repo.findOneBy({ rawAddress: pkRawAdmin });

    if (!admin || !(await IsValidPassword(password, admin.password))) {
      throw new Error('Forbidden');
    }
    return true;
  }
}
