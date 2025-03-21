import React from 'react'
import { StepBackIcon } from 'lucide-react'
import cn from 'classnames'
import styles from './ExchangeRateItem.module.css'
const ExchangeRateItem = (
    {
        symbol,
        lastPrice,
        priceChange,
    }
) => {

    
    const isPositive = Number(priceChange) > 0;

    return (
      <>
        <div className={styles.tokenName}>
          <span className={styles.shortName}>{symbol.slice(0, -4)}</span>
          <span className={styles.fullName}>{symbol.slice(-4)}</span>
        </div>
  
        <div className={styles.price}>
          ${Number(lastPrice).toFixed(0)}
        </div>
  
        <div className={styles.change}>
          <span className={styles.changeValue}>
            {Number(priceChange).toFixed(3)}
          </span>
          <StepBackIcon
            className={cn(
              styles.changeIcon,
              isPositive ? styles.up : styles.down
            )}
          />
        </div>
      </>
    );
}

export default ExchangeRateItem