import React from 'react';

const Technicals = () => {
  const data = {
    datasets: [
      {
        data: [20, 30, 50],
        backgroundColor: ['red', 'yellow', 'green'],
      },
    ],
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Technicals</h3>
      <h2>.................................</h2>
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

export default Technicals;
