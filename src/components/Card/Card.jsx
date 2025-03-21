import React from 'react'
import styles from './Card.module.css'
const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
              <div className={styles.heading}>
                  <h6 className={styles.sub__header}>ETHEREUM 2.0</h6>
                  <h2 className={styles.main__header}>Your Gateway into Blockchain</h2>
              </div>
              <p className={styles.pr}>Paronia is a blockchain platform. We make blockchain accessible.</p>
              
          </div>
        <div>
          <button className={styles.btn}>Learn More.</button>
        </div>
      </div>

      <div className={`${styles.decor} ${styles['decor-1']}`}></div>
      <div className={`${styles.decor} ${styles['decor-2']}`}></div>
      <div className={`${styles.decor} ${styles['decor-3']}`}></div>
      <div className={`${styles.decor} ${styles['decor-4']}`}></div>
      <div className={`${styles.decor} ${styles['decor-5']}`}></div>
      <div className={`${styles.decor} ${styles['decor-6']}`}></div>
        
    </div>
  )
}

export default Card