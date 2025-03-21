import axios from 'axios';

export const fetchBinanceChartData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines`,
      {
        params: {
          symbol,
          interval: '1d',
          limit: 30,
        },
      }
    );

    const data = response.data;
  
    const chartData = {
      labels: data.map((item) => new Date(item[0]).toLocaleDateString()),
      datasets: [
        {
          label: `${symbol} price`,
          data: data.map((item) => parseFloat(item[4])), 
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0,
          tension: 0.3,
          fill: false,
        },
      ],
    };

    return chartData;
  } catch (error) {
    console.error(`Ошибка при получении данных для ${symbol}:`, error);
    return null;
  }
};
