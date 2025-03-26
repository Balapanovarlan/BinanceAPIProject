import { parseEther } from 'viem';
import { useAccount, useConnect, useDisconnect, useSendTransaction, } from 'wagmi'

export const useWeb3 = () => {
    const { address, isConnected, status } = useAccount();

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
    }
}
