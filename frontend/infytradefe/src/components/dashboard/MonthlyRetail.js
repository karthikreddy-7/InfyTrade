import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyRetail = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Monthly Retail',
        data: [50, 50, 50, 50, 50, 50, 50],
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
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
      <h3 style={styles.cardTitle}>Monthly Retail</h3>
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

export default MonthlyRetail;
