import React, { useMemo, useState } from 'react'
import styles from './ExchangeRateTable.module.css'
import ExchangeRateItem from '../ExchangeRateItem/ExchangeRateItem'
import { useQuery } from '@tanstack/react-query'
import { getChangePricesApi } from '../../api/GetChangePrices/GetChangePrices'
import {ArrowDownIcon, ArrowUpIcon} from 'lucide-react'
import classNames from 'classnames'

const SORT_ORDERS = ['default', 'asc', 'desc'];

const ExchangeRateTable = () => {

    const {data, isLoading} = useQuery({
        queryKey: ["changePricesApi"],
        queryFn: getChangePricesApi,
    });
    
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('default');

    const toggleSort = (value) =>{
        setSortBy(value);
        setSortOrder(prev => {
            const currIndex = SORT_ORDERS.indexOf(prev);
            return SORT_ORDERS[(currIndex+1)% SORT_ORDERS.length];
        });

    }

    const sortedData = useMemo(()=>{
        if(!data) return [];

        let sorted = [...data];

        if(sortBy&& sortOrder !== 'dafault'){
            sorted.sort((a,b) => {
                const valueA = sortBy === 'symbol' ? a[sortBy] : Number(a[sortBy]);
                const valueB = sortBy === 'symbol' ? b[sortBy] : Number(b[sortBy]);
                
                if (sortOrder === 'asc') {
                    if (valueA > valueB) {
                        return 1;
                    }else{
                        return -1;
                    }
                }else{
                    if (valueA < valueB) {
                        return 1;
                    } else{
                        return -1;
                    }
                }
            });
        }
        
        return sorted;
    },[data, sortBy, sortOrder]) 

    if(isLoading){
        return 'loading'
    }

    return (
    <div className={styles.container}>
        <h4 className={styles.heading}>Marker trend</h4>
        <div className={styles.table}>


            <div className={styles.tableHeader}>
                <span className={styles.headerItem} onClick={()=>toggleSort('symbol')} >
                    Name
                    {sortBy === 'symbol' && <ArrowDownIcon  
                        className={
                            classNames(
                                styles.filterIcon,
                                sortOrder === 'asc'&&styles.filterAsc,
                                sortOrder === 'default' && styles.filterHide,
                    )}
                    />}
                </span>
                <span className={styles.headerItem} onClick={()=>toggleSort('lastPrice')}>
                    Last Price

                    {sortBy === 'lastPrice' && <ArrowDownIcon  
                        className={
                            classNames(
                                styles.filterIcon,
                                sortOrder === 'asc'&&styles.filterAsc,
                                sortOrder === 'default' && styles.filterHide,
                    )}
                    />}
                    </span>
                <span className={styles.headerItem} onClick={()=> toggleSort('priceChange')}>
                    24h Change

                    {sortBy === 'PriceChange' && <ArrowDownIcon  
                        className={
                            classNames(
                                styles.filterIcon,
                                sortOrder === 'asc'&&styles.filterAsc,
                                sortOrder === 'default' && styles.filterHide,
                    )}
                    />}
                    </span>
            </div>
            
            {
                sortedData.map((item)=>(
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