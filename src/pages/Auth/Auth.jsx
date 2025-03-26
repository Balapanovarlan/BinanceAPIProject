import React, { useEffect } from 'react'
import styles from './Auth.module.css';
import { useWeb3 } from '../../hooks/useWeb3/useWeb3';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../constants/PageRoutes';

const Auth = () => {
    const { address, connectors, connect } = useWeb3();

    const navigate = useNavigate();

    useEffect(() => {
        if (address) {
            navigate(PageRoutes.COMMON.MAIN);
        }
    }, [navigate, address]);

    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>
                <h4 className={styles.modalHeading}>Please connect your wallet!</h4>
                <div className={styles.btns}>
                    {connectors.map(connector => (
                        <button
                            key={connector.id}
                            className={styles.btn}
                            onClick={() => connect({ connector: connector })}
                        >
                            {connector.name}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Auth