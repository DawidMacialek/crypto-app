import React from 'react';
import { Line } from 'react-chartjs-2';

function CryptoDetailsChart({ coinHistory }) {
  const coinPrice = [];
  const coinTimestamp = [];

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
            stepsize: 10000,
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
