import { DataSource } from 'typeorm';

import { Dapp, User } from './models';
import config from '../config';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: config.db.path,
  synchronize: true,
  entities: [User, Dapp],
  logging: ['error'],
});
