import React from 'react';
import { getTradesApi } from '../api/GetTrades/GetTrades';
import { useQuery } from '@tanstack/react-query';
import Chart from '../../../components/Chart/Chart';
import styles from './TradesChart.module.css'


const TradesChart = () => {
    const { data: tradesData, isLoading: isTradesDataLoading } = useQuery({
        queryKey: ["Trades"],
        queryFn: getTradesApi,
        refetchInterval: 10000,
    });

    if (isTradesDataLoading) {
        return "Loading...";
    }

    const prices = tradesData.map(item => Number(item.price).toFixed(2));
    const timestamps = tradesData.map(item => new Date(item.time).toLocaleTimeString());

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                ticks: {
                    display: true,
                },
                grid: {
                    color: 'transparent',
                },
                border: {
                    display: false,
                },
            },
        },
    }


    const chartData = {
        labels: timestamps,
        datasets: [
            {
                label: "BTC trades",
                data: prices,
                pointRadius: 0 ,
                tension: 0.1,
                borderWidth: 3,
                borderColor: '#E323FF',
            },
        ],
    }

    return (
        <div>
            <div className={styles.container}>
                <Chart
                    data={chartData}
                    options={chartOptions}
                    size='large'
                />
            </div>
        </div>
    )
}

export default TradesChart

/*
    1) Сделать общий компонент с графиком (с 3 вариантами (большой, средний и маленький))
    2) Доделать стили для графика
    3) переделать <TradesChart />
*/