import React from 'react'
import { Line } from 'react-chartjs-2'
 import styles from './Chart.module.css'
 import Chartreg, { CategoryScale } from 'chart.js/auto'

 Chartreg.register(CategoryScale)

const Chart = ({ data, options, size }) => {


    const sizeMap = {
        small: { width: '25%' },
        medium: { width: '50%' },
        large: { width: '100%' },
    }

    return (
        <div style={sizeMap[size]} className={styles.wrapper}>
            <Line data={data} options={options} className={styles.chart} />
        </div>
    )
}

export default Chart