import React from 'react';

const Watchlist = () => {
  const watchlistData = [
    { symbol: 'IBM', last: '16.10', change: '+0.15' },
    { symbol: 'MSFT', last: '281.15', change: '+4.80' },
    { symbol: 'TASLA', last: '82.076', change: '-0.52' },
    { symbol: 'RACE', last: '108.45', change: '+0.45' },
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Watchlist</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {watchlistData.map((item, index) => (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{item.last}</td>
              <td>{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
table: {
    th: {
      border: '1px solid #555',
      padding: '8px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #555',
      padding: '8px',
      textAlign: 'left',
    },
  },
};

export default Watchlist;
