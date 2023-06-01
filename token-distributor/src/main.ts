import { dataSource } from './database';
import { initApi, initialize, transferProcess } from './utils';
import Server from './server';
import { DappOwnerService, TokenService } from './services';

const main = async () => {
  await initialize();
  await dataSource.initialize();
  console.log(`Database connections has been initialized`);

  await initApi();

  transferProcess();

  const server = new Server(new DappOwnerService(), new TokenService());
  server.run();
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
