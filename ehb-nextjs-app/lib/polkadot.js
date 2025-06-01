import { ApiPromise, WsProvider } from '@polkadot/api';

const POLKADOT_WS = process.env.POLKADOT_WS || 'wss://rpc.polkadot.io';

let api = null;

export async function getPolkadotApi() {
  if (!api) {
    const provider = new WsProvider(POLKADOT_WS);
    api = await ApiPromise.create({ provider });
  }
  return api;
} 