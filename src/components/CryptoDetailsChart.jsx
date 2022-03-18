import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function CryptoDetailsChart({ coinHistory }) {
  const coinPrice = [];
  const coinTimestamp = [];
  const [chartWidth, setChartWidth] = useState(true);
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    function changeChartWidth() {
      setScreenWidth(window.innerWidth);

      if (screenWidth < 1000) {
        setChartWidth(false);
      } else {
        setChartWidth(true);
      }
    }
    changeChartWidth();
    window.addEventListener('resize', changeChartWidth);
    return () => {
      window.removeEventListener('resize', changeChartWidth);
    };
  }, [screenWidth]);

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    let dates = new Date(coinHistory?.data?.history[i].timestamp * 1000)
      .toISOString()
      .slice(0, 10);
    coinTimestamp.unshift(dates);
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 2,
          },
        },
      ],
    },
  };

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        borderWidth: chartWidth ? 3 : 1,
        pointBorderWidth: chartWidth ? 3 : 1,
        pointBackgroundColor: '#ff000000',
        stepSize: 10000,
        pointRadius: chartWidth ? 3 : 1,
      },
    ],
  };
  return (
    <div className='chart-container'>
      <Line options={options} data={data} />
    </div>
  );
}

export default CryptoDetailsChart;
