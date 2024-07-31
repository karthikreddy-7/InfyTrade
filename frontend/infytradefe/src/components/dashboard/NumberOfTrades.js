import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const NumberOfTrades = () => {
  const data = {
    labels: ['IBM', 'MSFT','TASLA','RACE'],
    datasets: [
      {
        label: 'Number of Trades',
        data: [60, 40, 30, 100],
        backgroundColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)','rgba(100, 176, 104, 1)','rgba(150, 204, 186, 1)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Number of Trades</h3>
      <Doughnut data={data} />
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


export default NumberOfTrades;
