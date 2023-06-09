import assert from 'assert';
import { config } from 'dotenv';
import { BN } from '@polkadot/util';

config();

const getEnv = <T = string>(name: string, default_?: string, fn?: Function): T => {
  const env = process.env[name] || default_;

  assert.notStrictEqual(env, undefined, `Environment variable ${name} is not specified`);

  return fn ? fn(env) : env;
};

export default {
  db: {
    path: getEnv('DB_PATH', 'db/db.sqlite3'),
  },
  api: {
    address: getEnv('WS_ADDRESS', 'ws://127.0.0.1:9944'),
    value: new BN(getEnv<number>('BALANCE_TO_TRANSFER', '10000000000000', Number)),
    accountSeed: getEnv('SEED', '//Alice'),
  },
  server: {
    port: getEnv('PORT', '3000', Number),
  },
};
