import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { chains } from '~/configs/setup-wallet';

export const useConnectWallet = (chainId = 49088) => {
  const { address, isConnected } = useAccount();

  const { connect, error, isLoading } = useConnect({
    chainId,
    connector: new MetaMaskConnector({ chains }),
  });

  const { disconnect } = useDisconnect();

  return {
    connect,
    disconnect,
    isConnected,
    isConnectLoading: isLoading,
    isConnectError: error,

    address,
  };
};
