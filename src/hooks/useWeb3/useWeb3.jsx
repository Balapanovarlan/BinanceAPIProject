import { parseEther, formatEther } from 'viem';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useSendTransaction, 
  useBalance 
} from 'wagmi'

import { mainnet } from 'viem/chains';
export const useWeb3 = () => {
  const { address, isConnected, status } = useAccount();
  const { 
    data: balanceData, 
    isLoading: isBalanceLoading,
    error: balanceError,
    refetch: refetchBalance
  } = useBalance({
    address,
    chainId: mainnet.id,
    enabled: !!address,
  });
  
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction } = useSendTransaction();

  const sendETH = (to, amount) => {
    if (!sendTransaction) return;
    sendTransaction({ to, value: parseEther(amount) });
  }
  
  return {
    address,
    isConnected,
    status,
    connectors,
    connect,
    disconnect,
    sendETH,
    balance: balanceData  || '0.00',
    isBalanceLoading,
    balanceError,
    refetchBalance,
  }
}