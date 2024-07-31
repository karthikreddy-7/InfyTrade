import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-trendline';

const TradesByStrategies = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'RSI',
        data: [30, 40, 50, 60, 70, 60, 50],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'MACD',
        data: [20, 25, 30, 35, 30, 25, 20],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'SMA',
        data: [15, 20, 25, 20, 15, 20, 25],
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'EMA',
        data: [10, 15, 20, 25, 20, 15, 10],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        yAxisID: 'y',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      trendlineLinear: {
        style: 'rgba(255,105,180, .8)',
        lineStyle: 'dotted|solid',
        width: 2
      }
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Trading Indicators</h3>
      <Line data={data} options={options} />
    </div>
  );
};

const styles = {
  card: {
    background: '#2c2c2e',
    borderRadius: '8px',
    padding: '20px',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    marginBottom: '10px',
  },
};

export default TradesByStrategies;
