# Services to facilitate the development and testing of your dApp

***It's important to note that these services should only be used for development and testing purposes as they may not be safe and secure for use in production.***

## template-frontend
A template that provides basic functionality for interacting with the Gear protocol.

With this template, there's no need to connect a wallet as private and public keys are generated on the frontend and stored in local storage and the `dapp-dev` backend service. 

***It's important to note that these keys should not be used anywhere else except for this app.***

## dapp-dev
A backend service provides a few endpoints that allow you to store user pairs of keys and make requests for tokens for testing purposes.
You can find API documentation by accessing the `/api-docs` endpoint after running the service.

Run using Docker
```bash
docker run -dt -p 3000:3000 -v /tmp/dapp-dev:/usr/src/db --env-file path/to/env/file ghcr.io/osipov-mit/free-tokens/dapp-dev:latest
```

## token-distributor
A backend which is hosted by the the Gear team and allows you to register your dApp to request tokens for dApp users. 
You can find API documentation by accessing the `/api-docs` endpoint after running the service.


## workflow
1. Register a dApp owner in the token-distributor backend hosted by the Gear team.
To register a dApp owner you'll need to send a `POST` request to the `/dapp_owner/register` endpoint with the `public key` and `email` of the owner, `dApp name`, and `signature` (which is actually the owner's public key signed with their private key). You can create a signed payload using the [polkadot.js.org](https://polkadot.js.org/apps/?rpc=wss://testnet.vara.rs#/signing) app.

```bash
curl --location https://token-dist.backend/dapp_owner/register --header 'Content-Type: application/json' --data '{
  "publicKey": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
  "dappName": "Amazing dApp",
  "signature": "0x...",
  "email": "bob@bob.com"
}'

```

Instead of sending request mannualy you can use `register_owner.sh` script from `dapp-dev` directory.

2. Request tokens for dApp user
Once the dApp owner is approved, they can request free tokens for their dApp users by sending a `POST` request to the `/tokens/request` endpoint in the dapp-dev backend.

```bash
curl --location https://dapp-dev.backend/tokens/request --header 'Content-Type: application/json' --data '{"password": "bob"}'
```

Alternatively, you can use the `tokens_req.sh` script from the `dapp-dev` directory.