import React from 'react';

const Purchases = () => {
  const purchasesData = [
    { id: 'IBM', status: 'Pending', Price: '400', type: 'Buy' },
    { id: 'TASlA', status: 'Pending', Price: '125', type: 'Sell' },
    { id: 'RACE', status: 'Success', Price: '230', type: 'Buy' },
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Active Trade</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Status</th>
            <th>Order Type</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {purchasesData.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.id}</td>
              <td>{purchase.status}</td>
              <td>{purchase.Price}</td>
              <td>{purchase.type}</td>
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

export default Purchases;
