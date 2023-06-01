import express, { Express, json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import { IDappOwnerApproveReq, IDappOwnerRegisterReq, ITokensRequestReq } from './types';
import config from './config';
import { DappOwnerService, TokenService } from './services';

const doc = JSON.parse(fs.readFileSync('./openapi3_0.json', 'utf-8'));

export default class Server {
  private app: Express;

  constructor(private dappOwnerService: DappOwnerService, private tokenService: TokenService) {
    this.app = express();
    this.app.use(cors());
    this.app.use(json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.post('/dapp_owner/register', async (req: IDappOwnerRegisterReq, res) => {
      try {
        res.json(await this.dappOwnerService.register(req.body));
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    this.app.post('/dapp_owner/approve', async (req: IDappOwnerApproveReq, res) => {
      try {
        res.json(await this.dappOwnerService.approve(req.body));
      } catch (err) {
        res.status(400).send(err.message);
      }
    });

    this.app.get('/dapp_owner/all_non_approved', async (_, res) => {
      try {
        res.json(await this.dappOwnerService.nonApproved());
      } catch (err) {
        res.status(500).send(err.message);
      }
    });

    this.app.post('/tokens/request', async (req: ITokensRequestReq, res) => {
      try {
        res.json(await this.tokenService.request(req.body));
      } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
      }
    });
  }

  run(): void {
    this.app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  }
}
