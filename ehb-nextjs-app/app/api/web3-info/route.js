import { ethProvider, polygonProvider, bscProvider } from '../../../lib/blockchain';

export async function GET() {
  try {
    const [eth, polygon, bsc] = await Promise.all([
      ethProvider.getNetwork(),
      polygonProvider.getNetwork(),
      bscProvider.getNetwork()
    ]);
    return Response.json({
      ethereum: eth,
      polygon: polygon,
      bsc: bsc
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 