import React, { useEffect } from 'react'
import styles from './Auth.module.css'
import { useWeb3 } from '../../hooks/useWeb3/useWeb3'
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants/PageRoutes';

const Auth = () => {
    const {address, connectMetaMask} = useWeb3();
    const navigate = useNavigate();

    useEffect(()=>{
      if(address){
        navigate(PageRoutes.COMMON.MAIN);
      }
    }, [address, navigate])

  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <h4 >Please connect your wallet</h4>
            <div className={styles.btns}>
                <button onClick={connectMetaMask} className={styles.btn}>Metamask</button>
                <button className={styles.btn}>Phantom</button>
                <button className={styles.btn}>OKX</button>
            </div>
        </div>

    </div>
  )
}

export default Auth