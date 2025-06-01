import { getPolkadotApi } from '../../../lib/polkadot';

export async function GET() {
  try {
    const api = await getPolkadotApi();
    const chain = await api.rpc.system.chain();
    const name = await api.rpc.system.name();
    const version = await api.rpc.system.version();
    return Response.json({ chain: chain.toString(), name: name.toString(), version: version.toString() });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 