import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import ABI from '@/lib/abi/Contract'

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_URL ?? 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      }),
    }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Template',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

interface Contract {
  address: `0x${string}`;
  abi: any;
}

const contract: Contract = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi: ABI,  
}

export { chains, connectors, contract, provider, wagmiClient };