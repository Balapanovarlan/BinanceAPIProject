import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import { fetchBinanceChartData } from '../../api/fetchBinanceChartData';
import { getChangePricesApi } from '../../../ExtangeRate/api/GetChangePrices/GetChangePrices';

import Chart from '../../../../components/Chart/Chart';
import { ArrowLeftRightIcon, CircleArrowDown, CircleArrowUp } from 'lucide-react';

import styles from './Slider.module.css';
import { useQuery } from '@tanstack/react-query';
import { coinIcons } from '../../../../constants/coinIcons';

SwiperCore.use([Autoplay, FreeMode, Navigation]);

const cryptoPairs = ['BTCUSDT', 'ETHUSDT', 'LTCUSDT', 'BNBUSDT', 'CAKEUSDT', 'ADAUSDT'];

const Slider = () => {
  const [charts, setCharts] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['ChangesPricesApi'],
    queryFn: getChangePricesApi, 
  });

  useEffect(() => {
    const loadCharts = async () => {
      const results = await Promise.all(
        cryptoPairs.map(async (pair) => {
          const chartData = await fetchBinanceChartData(pair);
          return { pair, chartData };
        })
      );
      setCharts(results);
    };

    loadCharts();
  }, []);

  useEffect(() => {
    if (!data || !charts.length) return;
    const combined = charts.map((item) => {
      const ticker = data.find((t) => t.symbol === item.pair);
      if (!ticker) return null; 
      return {
        pair: item.pair,
        chartData: item.chartData,
        lastPrice: ticker.lastPrice,
        priceChangePercent: ticker.priceChangePercent,
      };
    }).filter(Boolean);

    setMergedData(combined);
  }, [data, charts]);

  if (isLoading) {
    return 'Loading';
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Swiper
      navigation = {true}
      spaceBetween={10}
      slidesPerView={5}
      freeMode
      loop
    >
      {mergedData.map((item, index) => {
        const isPositive = parseFloat(item.priceChangePercent) >= 0;
        const base = item.pair.replace('USDT', '');
        const quote = 'USD';

        const tokenIcon = coinIcons[base] ? (
          <img src={coinIcons[base]} alt={base} className={styles.tokenIcon} width={50}/>
        ) : (
          <ArrowLeftRightIcon className={styles.icon} color="white" />
        );

        return (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.pair}>
                  {tokenIcon}
                  <span>{base}</span>
                  <ArrowLeftRightIcon className={styles.icon} color='white'/>
                  <span>{quote}</span>
                </div>
                <div className={styles.change}>
                  {isPositive ? (
                    <CircleArrowUp color="green" />
                  ) : (
                    <CircleArrowDown color="red" />
                  )}
                  <span style={{ color: isPositive ? 'green' : 'red' }}>
                    {item.priceChangePercent}%
                  </span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.price}>
                  {parseFloat(item.lastPrice).toFixed(2)}
                </span>
                  <Chart
                    data={item.chartData}
                    options={chartOptions}
                    size="small"
                  />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
