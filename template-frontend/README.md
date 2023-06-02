# React application template

***It's important to note that this application should only be used for development and testing purposes as it may not be safe and secure for use in production.***

***Public and private keys from this app should not be used anywhere else except for this app.***

## Getting started

### Install packages:

```sh
npm install
```

### Declare environment variables:

Create `.env` file, `.env.example` will let you know what variables are expected:

- `REACT_APP_NODE_ADDRESS` - network address you want connect to
- `REACT_APP_API_ADDRESS` - login backend endpoint
- `REACT_APP_CONTRACT_ADDRESS` - address of the contract uploaded to chosen network
- `REACT_APP_META_RAW` - contract meta from compiled `meta.txt` file

In order for all features to work as expected, the node and it's runtime version should be chosen based on the current `@gear-js/api` version.

In case of issues with the application, try to switch to another network or run your own local node and specify its address in the .env file. When applicable, make sure the smart contract(s) wasm files are uploaded and running in this network accordingly.

### Run the app:

```sh
npm start
```
