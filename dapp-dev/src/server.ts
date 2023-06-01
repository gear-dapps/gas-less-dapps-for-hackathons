import express, { Express, json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import config from './config';
import { ITokenReq, IUserRegisterReq } from './types';
import { signData, gearBackendReq } from './utils';
import { UserService } from './services';

const doc = JSON.parse(fs.readFileSync('./openapi3_0.json', 'utf-8'));

export class Server {
  private app: Express;

  constructor(private userService: UserService) {
    this.app = express();
    this.app.use(cors());
    this.app.use(json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.post('/user/register', async (req: IUserRegisterReq, res) => {
      try {
        res.status(200).json(await this.userService.register(req.body));
      } catch (err) {
        console.error(err);
        res.statusMessage = err.message;
        res.status(500).send();
      }
    });

    this.app.post('/user/get_keys', async (req: IUserRegisterReq, res) => {
      try {
        res.status(200).json(await this.userService.getKeys(req.body));
      } catch (err) {
        console.error(err);
        res.statusMessage = err.message;
        res.status(400).send();
      }
    });

    this.app.post('/tokens/request', async (req: ITokenReq, res) => {
      try {
        await this.userService.isAdmin(req.body);
        const users = await this.userService.getAllPublicKeys();
        const signature = signData(config.owner.publicKey);
        console.log({ users, publicKey: config.owner.publicKey, signature });
        res
          .status(200)
          .json(await gearBackendReq('/tokens/request', { users, publicKey: config.owner.publicKey, signature }));
      } catch (err) {
        console.error(err);
        res.statusMessage = err.message;
        res.status(500).send();
      }
    });
  }

  run(): void {
    this.app.listen(config.server.port, () => {
      console.error(`Server is running on port ${config.server.port}`);
    });
  }
}
