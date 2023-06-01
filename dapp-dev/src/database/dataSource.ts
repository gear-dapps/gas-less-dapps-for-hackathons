import { DataSource } from 'typeorm';
import { User } from './user.model';
import config from '../config';

export const dataSource = new DataSource({
  type: 'sqlite',
  entities: [User],
  database: config.db.path,
  synchronize: true,
});
