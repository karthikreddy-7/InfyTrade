import React, { useState } from "react";
import BarChart from "./BarChart.js";
import PieChart from "./PieChart.js";
import LineChart from "./LineChart.js";
import OHLCChart from "./OHLCChart.js";
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
  { value: 'line', label: 'Line Chart' },
  { value: 'ohlc', label: 'OHLC Chart' }, 
];

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A6',
  '#FF8C00', '#00FF8C', '#8C00FF', '#FF1493', '#00CED1'
];

const Analysis = () => {
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].value);
  const [chartType, setChartType] = useState(chartTypes[0].value);
  const [period, setPeriod] = useState(periods[0].value);
  const [additionalStocks, setAdditionalStocks] = useState([]);

  const handleStockChange = (event) => setSelectedStock(event.target.value);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
    if (event.target.value !== 'line') setAdditionalStocks([]);
  };

  const handlePeriodChange = (event) => setPeriod(event.target.value);

  const handleAdditionalStockChange = (event) => {
    const value = event.target.value;
    setAdditionalStocks(prev =>
      prev.includes(value) ? prev.filter(stock => stock !== value) : [...prev, value]
    );
  };

  const renderChart = () => {
    const selectedStockData = mockData[period].datasets[selectedStock].data;
    const data = {
      labels: mockData[period].labels,
      datasets: [
        {
          label: stockOptions.find(stock => stock.value === selectedStock).label,
          data: selectedStockData,
          backgroundColor: chartType === 'bar' ? 'rgba(54, 162, 235, 0.6)' : colors[0],
          borderColor: chartType === 'bar' ? 'rgba(54, 162, 235, 1)' : colors[0],
          borderWidth: 1,
        },
        ...additionalStocks.map((stock, index) => ({
          label: stockOptions.find(opt => opt.value === stock).label,
          data: mockData[period].datasets[stock].data,
          backgroundColor: chartType === 'bar' ? 'rgba(54, 162, 235, 0.6)' : colors[(index + 1) % colors.length],
          borderColor: chartType === 'bar' ? 'rgba(54, 162, 235, 1)' : colors[(index + 1) % colors.length],
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
      case 'ohlc':
        return <OHLCChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex">
      <div className="w-1/4 pr-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">Stock Analysis</h2>
        <div className="flex flex-col gap-4 mb-6">
          <select
            value={selectedStock}
            onChange={handleStockChange}
            className="p-2 border rounded bg-primary text-white"
          >
            {stockOptions.map((option) => (
              <option className="text-primary bg-white" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="p-2 border rounded bg-primary text-white"
          >
            {chartTypes.map((option) => (
              <option className="text-primary bg-white" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={period}
            onChange={handlePeriodChange}
            className="p-2 border rounded bg-primary text-white"
          >
            {periods.map((option) => (
              <option className="text-primary bg-white" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {chartType === 'line' && (
            <div className="flex flex-col items-start">
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
      </div>
      <div className="w-3/4 bg-white p-4 rounded shadow-md">
        {renderChart()}
      </div>
    </div>
  );
};

export default Analysis;
