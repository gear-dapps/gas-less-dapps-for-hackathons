import assert from 'assert';
import { config } from 'dotenv';

config();

const getEnv = <T = string>(name: string, default_?: string, fn?: Function): T => {
  const env = process.env[name] || default_;

  assert.notStrictEqual(env, undefined, `Environment variable ${name} is not specified`);

  return fn ? fn(env) : env;
};

export default {
  server: {
    port: getEnv('PORT', '3000', Number),
  },
  db: {
    path: getEnv('DB_PATH', 'db/db.sqlite3'),
  },
  owner: {
    publicKey: getEnv('PUBLIC_KEY'),
    privateKey: getEnv('PRIVATE_KEY'),
    password: getEnv('PASSWORD'),
    nickname: getEnv('NICKNAME', 'admin'),
  },
  gearBackend: {
    address: getEnv('GEAR_BACKEND_ADDRESS', 'http://127.0.0.1:3000'),
  },
};
