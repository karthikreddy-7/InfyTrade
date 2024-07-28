import React, { useState } from "react";

const Rankings = () => {
  // Sample data with five users and random names
  const rankingsData = [
    { rank: 1, name: "Alice", portfolioValue: "$150,000" },
    { rank: 2, name: "Bob", portfolioValue: "$130,000" },
    { rank: 3, name: "Charlie", portfolioValue: "$120,000" },
    { rank: 4, name: "Diana", portfolioValue: "$110,000" },
    { rank: 5, name: "Eve", portfolioValue: "$100,000" },
  ];

  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Handler for changing pages
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Portfolio Rankings in Your Community</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Rank</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Portfolio Value</th>
          </tr>
        </thead>
        <tbody>
          {rankingsData.map((user, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableData}>{user.rank}</td>
              <td style={styles.tableData}>{user.name}</td>
              <td style={styles.tableData}>{user.portfolioValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component */}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={styles.pageNumber}>{currentPage}</span>
        <button
          style={styles.paginationButton}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    color: "#3498db",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2em"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableHeader: {
    backgroundColor: "#3498db",
    color: "#ffffff",
    padding: "15px",
    borderBottom: "2px solid #ddd",
    textAlign: "center",
    fontSize: "1.2em"
  },
  tableRow: {
    borderBottom: "1px solid #ddd"
  },
  tableData: {
    padding: "15px",
    textAlign: "center"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },
  paginationButton: {
    backgroundColor: "#ffffff",
    color: "#3498db",
    border: "1px solid #3498db",
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "1em",
    fontFamily: "Arial, sans-serif"
  },
  pageNumber: {
    margin: "0 10px",
    fontSize: "1.2em"
  }
};

export default Rankings;
