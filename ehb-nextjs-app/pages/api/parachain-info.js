import { getParachainApi } from '../../lib/parachain';

export default async function handler(req, res) {
  try {
    const api = await getParachainApi();
    const chain = await api.rpc.system.chain();
    const name = await api.rpc.system.name();
    const version = await api.rpc.system.version();
    res.status(200).json({ chain: chain.toString(), name: name.toString(), version: version.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 