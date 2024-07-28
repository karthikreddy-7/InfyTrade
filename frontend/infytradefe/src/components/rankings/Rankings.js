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
              <td style={styles.tableData}>
                <span style={styles.rankIcon}>🏆</span> {user.rank}
              </td>
              <td style={styles.tableData}>{user.name}</td>
              <td style={styles.tableData}>{user.portfolioValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component */}
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.paginationButton,
            ...styles.paginationButtonDisabled(currentPage === 1),
          }}
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

// Enhanced inline styles with original color scheme
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    width: "95%",
    maxWidth: "1200px",
  },
  header: {
    color: "#3498db",
    marginBottom: "20px",
    fontSize: "2em",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    borderRadius: "10px",
    overflow: "hidden",  // For rounded corners
  },
  tableHeader: {
    backgroundColor: "#3498db",
    color: "#ffffff",
    padding: "15px",
    borderBottom: "2px solid #ddd",
    fontSize: "1.1em",
    textTransform: "uppercase",
  },
  tableRow: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #dddddd",
    transition: "background-color 0.2s",
    cursor: "pointer",
  },
  tableRowHover: {
    backgroundColor: "#f1f1f1",
  },
  tableData: {
    padding: "15px",
    textAlign: "center",
    color: "#333",
    fontSize: "1em",
    fontWeight: "normal",
  },
  rankIcon: {
    marginRight: "10px",
    color: "#3498db",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
  },
  paginationButton: {
    backgroundColor: "#ffffff",
    color: "#3498db",
    border: "1px solid #3498db",
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1em",
    transition: "background-color 0.2s, color 0.2s",
    fontWeight: "bold",
  },
  paginationButtonDisabled: (disabled) => ({
    color: disabled ? "#ccc" : "#3498db",
    borderColor: disabled ? "#ccc" : "#3498db",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  pageNumber: {
    margin: "0 10px",
    fontSize: "1.2em",
    color: "#3498db",
  },
};

export default Rankings;
