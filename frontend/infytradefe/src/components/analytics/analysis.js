import React, { useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const stockOptions = [
  { value: 'IBM', label: 'IBM' },
  { value: 'MSFT', label: 'Microsoft' },
  { value: 'TSLA', label: 'Tesla' },
  { value: 'RACE', label: 'Ferrari N.V.' },
];

const chartTypes = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'line', label: 'Line Chart' },
];

const Analysis = () => {
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].value);
  const [chartType, setChartType] = useState(chartTypes[0].value);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart selectedStock={selectedStock} />;
      case 'pie':
        return <PieChart selectedStock={selectedStock} />;
      case 'line':
        return <LineChart selectedStock={selectedStock} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2>Stock Analysis</h2>
      <div style={styles.selectionContainer}>
        <select value={selectedStock} onChange={handleStockChange} style={styles.select}>
          {stockOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={chartType} onChange={handleChartTypeChange} style={styles.select}>
          {chartTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.chartContainer}>
        {renderChart()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  selectionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
  },
  chartContainer: {
    marginTop: "20px",
  },
};

export default Analysis;
