import { HexString } from '@polkadot/util/types';

const ADDRESS = {
  NODE: process.env.REACT_APP_NODE_ADDRESS as string,
  API: process.env.REACT_APP_API_ADDRESS as string,
  CONTRACT: process.env.REACT_APP_CONTRACT_ADDRESS as HexString,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

const META_RAW = process.env.REACT_APP_META_RAW as string;
const META_HEX = `0x${META_RAW}` as HexString;

export { ADDRESS, LOCAL_STORAGE, META_HEX };
