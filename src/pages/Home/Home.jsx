import React, { useCallback, useEffect, useState } from 'react'
import TradesChart from '../../features/Trades/TradesChart/TradesChart'
import ExchangeRateTable from '../../features/ExtangeRate/components/ExchangeRateTable/ExchangeRateTable'
import Card from '../../components/Card/Card'
import styles from './Home.module.css'
import Slider from '../../features/ChartSlider/components/Slider/Slider'
import { useWeb3 } from '../../hooks/useWeb3/useWeb3'
import { useNavigate } from 'react-router-dom'
import { PageRoutes } from '../../constants/PageRoutes'
import Transfer from '../../components/Transfer/Transfer'
import Child from './Child'

const Home = () => {
    const {address} = useWeb3();

    const navigate = useNavigate();

    const [count, setCount] = useState(0);

    const handleClick = useCallback(()=>{
        console.log('click');
        setCount(prev => prev+1);
    },[])

    useEffect(()=>{
        if(!address){
            //redirect to auth
            navigate(PageRoutes.AUTH.LOGIN)
        }
    }, [address,navigate])
    
    
    return (
        <div className={styles.wrapper}>
         
            <div className={styles.main__cards}>
                <Card />
                <TradesChart />
            </div>
            <div>
                <Slider />
            </div>
            <div className={styles.bottom_cards}>
                <ExchangeRateTable />
                <Transfer />
            </div>
        </div>
    )
}

export default Home