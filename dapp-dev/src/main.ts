import config from './config';
import { dataSource } from './database';
import { Server } from './server';
import { UserService } from './services';
import { initialize } from './utils';

const main = async () => {
  await dataSource.initialize();
  console.log(`Database connections has been initialized`);
  await initialize();
  const userService = new UserService();
  try {
    await userService.register({
      nickname: config.owner.nickname,
      password: config.owner.password,
      privateKey: config.owner.privateKey,
      publicKey: config.owner.publicKey,
    });
  } catch (err) {
    console.log(err.message);
  }
  const server = new Server(userService);
  server.run();
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
