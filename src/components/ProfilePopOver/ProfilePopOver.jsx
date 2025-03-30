import React, { useEffect, useState } from 'react';
import styles from './ProfilePopover.module.css';
import { useWeb3 } from '../../hooks/useWeb3/useWeb3';
import { Copy, Loader, LogOut } from 'lucide-react';

const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ProfilePopover = ({ onClose }) => {
    const { 
        address, 
        disconnect, 
        balance, 
        isBalanceLoading, 
        balanceError,
        refetchBalance 
      } = useWeb3();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (address) {
      refetchBalance();
    }
  }, [address]);

  return (
    <div className={styles.popover}>
      <div className={styles.profileInfo}>
        <div className={styles.addressRow} onClick={handleCopyAddress}>
          <span className={styles.address}>{formatAddress(address)}</span>
          <Copy size={14} className={styles.copyIcon} />
          {isCopied && <span className={styles.copiedText}>Copied!</span>}
        </div>
        <div className={styles.balance}>
            {balanceError ? (
            <span className={styles.error}>
                Error loading balance {console.log(balanceError)
                }
            </span>
            ) : isBalanceLoading ? (
            <Loader size={16} className={styles.loader} />
            ) : (
            <span className={styles.balanceValue}>
                {Number(balance).toFixed(4)} ETH
            </span>
            )}
      </div>
      </div>

      <button 
        className={styles.disconnectButton}
        onClick={() => {
          disconnect();
          onClose();
        }}
      >
        <LogOut size={16} className={styles.disconnectIcon} />
        Disconnect
      </button>
    </div>
  );
};

export default ProfilePopover;