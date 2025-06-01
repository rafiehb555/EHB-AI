import { ApiPromise, WsProvider } from '@polkadot/api';

const PARACHAIN_WS = process.env.PARACHAIN_WS || 'wss://kusama-rpc.polkadot.io';

let api = null;

export async function getParachainApi() {
  if (!api) {
    const provider = new WsProvider(PARACHAIN_WS);
    api = await ApiPromise.create({ provider });
  }
  return api;
} 