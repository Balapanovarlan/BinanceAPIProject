import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors';

export const useWeb3 = () => {
    const {address, isConnected, status} = useAccount();
    const {connect} = useConnect();
    const {disconnect} = useDisconnect();

  return {
    address,
    isConnected,
    status,
    disconnect,
    connectMetaMask: ()=> connect({connector: metaMask()}),

  }
}

