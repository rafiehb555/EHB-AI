import { ethers } from 'ethers';

// Ethereum Provider
const ethProvider = new ethers.JsonRpcProvider(process.env.ETHRPCURL);

// BSC Provider
const bscProvider = new ethers.JsonRpcProvider(process.env.BSCRPCURL);

// Polygon Provider
const polygonProvider = new ethers.JsonRpcProvider(process.env.POLYGONRPCURL);

// Polygon World Chain Provider
const worldChainProvider = new ethers.JsonRpcProvider(process.env.POLYGONWORLDCHAINRPC_URL);

export {
  ethProvider,
  bscProvider,
  polygonProvider,
  worldChainProvider
}; 