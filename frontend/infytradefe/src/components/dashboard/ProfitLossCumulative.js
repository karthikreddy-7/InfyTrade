import React from 'react';
import { Line } from 'react-chartjs-2';

const ProfitLossCumulative = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Profit/Loss Cumulative',
        data: [12000, 19000, 3000, 5000, 20000, 30000, 40000],
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderColor: 'rgba(255, 206, 86, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Profit/Loss Cumulative</h3>
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

export default ProfitLossCumulative;
