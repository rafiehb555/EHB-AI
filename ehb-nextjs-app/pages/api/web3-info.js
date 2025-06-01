import { ethProvider, polygonProvider, bscProvider } from '../../lib/blockchain';

export default async function handler(req, res) {
  try {
    const [eth, polygon, bsc] = await Promise.all([
      ethProvider.getNetwork(),
      polygonProvider.getNetwork(),
      bscProvider.getNetwork()
    ]);
    res.status(200).json({
      ethereum: eth,
      polygon: polygon,
      bsc: bsc
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 