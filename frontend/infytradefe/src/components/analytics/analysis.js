import React, { useState } from "react";
import BarChart from "./BarChart.js";
import PieChart from "./PieChart.js";
import LineChart from "./LineChart.js";
import { mockData } from "./mockdata.ts";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

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

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const Analysis = () => {
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].value);
  const [chartType, setChartType] = useState(chartTypes[0].value);
  const [period, setPeriod] = useState(periods[0].value);
  const [additionalStocks, setAdditionalStocks] = useState([]);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
    if (event.target.value !== 'line') {
      setAdditionalStocks([]);
    }
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleAdditionalStockChange = (event) => {
    const value = event.target.value;
    setAdditionalStocks(prev =>
      prev.includes(value) ? prev.filter(stock => stock !== value) : [...prev, value]
    );
  };

  const renderChart = () => {
    const data = {
      labels: mockData[period].labels,
      datasets: [
        {
          label: stockOptions.find(stock => stock.value === selectedStock).label,
          data: mockData[period].datasets[selectedStock].data,
          backgroundColor: chartType === 'bar' ? 'rgba(54, 162, 235, 0.6)' : getRandomColor(),
          borderColor: chartType === 'bar' ? 'rgba(54, 162, 235, 1)' : getRandomColor(),
          borderWidth: 1,
        },
        ...additionalStocks.map(stock => ({
          label: stockOptions.find(opt => opt.value === stock).label,
          data: mockData[period].datasets[stock].data,
          backgroundColor: chartType === 'bar' ? 'rgba(54, 162, 235, 0.6)' : getRandomColor(),
          borderColor: chartType === 'bar' ? 'rgba(54, 162, 235, 1)' : getRandomColor(),
          borderWidth: 1,
        })),
      ],
    };

    switch (chartType) {
      case 'bar':
        return <BarChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      case 'line':
        return <LineChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Stock Analysis</h2>
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={selectedStock}
          onChange={handleStockChange}
          className="p-2 border rounded"
        >
          {stockOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={chartType}
          onChange={handleChartTypeChange}
          className="p-2 border rounded"
        >
          {chartTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="p-2 border rounded"
        >
          {periods.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {chartType === 'line' && (
          <div className="flex flex-col items-center">
            {stockOptions.filter(stock => stock.value !== selectedStock).map((option) => (
              <div key={option.value} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={additionalStocks.includes(option.value)}
                  onChange={handleAdditionalStockChange}
                  className="form-checkbox"
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        {renderChart()}
      </div>
    </div>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Analysis;
