import { Chain } from '@wagmi/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getDefaultClient } from 'connectkit';
import { configureChains, createClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

export const bfcTestnet = {
  id: 49088,
  name: 'Bifrost Testnet',
  network: 'bfcTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bifrost',
    symbol: 'BFC',
  },
  rpcUrls: {
    public: { http: ['https://public-01.testnet.thebifrost.io/rpc'] },
    default: { http: ['https://public-01.testnet.thebifrost.io/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'BIFROST Testnet Explorer', url: 'https://explorer.testnet.thebifrost.io/' },
    default: { name: 'BIFROST Testnet Explorer', url: 'https://explorer.testnet.thebifrost.io/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain

const chains = [bfcTestnet];
const { provider, webSocketProvider } = configureChains(chains, [publicProvider()]);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export { chains, client };
