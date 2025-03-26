import React from 'react'
import styles from './ExchangeRateTable.module.css'
import ExchangeRateItem from '../ExchangeRateItem/ExchangeRateItem'
import { useQuery } from '@tanstack/react-query'
import { getChangePricesApi } from '../../api/GetChangePrices/GetChangePrices'

const ExchangeRateTable = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["changePricesApi"],
        queryFn: getChangePricesApi,
    });
    
    if(isLoading){
        return 'loading'
    }

    return (
    <div className={styles.container}>
        <h4 className={styles.heading}>Marker trend</h4>
       
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <span className={styles.headerItem}>Name</span>
                <span className={styles.headerItem}>Last Price</span>
                <span className={styles.headerItem}>24h Change</span>
            </div>
            
            {
                data.map((item)=>(
                    <ExchangeRateItem
                    key={item.symbol}
                    symbol={item.symbol}
                    priceChange={item.priceChange}
                    lastPrice={item.lastPrice}
                />
                ))
            }
           
        </div>

    </div>
  )
}

export default ExchangeRateTable