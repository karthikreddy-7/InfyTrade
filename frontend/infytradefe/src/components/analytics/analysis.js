import React, { useState } from 'react';
import BarChart from './BarChart.js';
import LineChart from './LineChart.js';
import AreaChart from './AreaChart.js';
import { mockData } from './mockdata.ts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const stockOptions = [
  { value: 'IBM', label: 'IBM' },
  { value: 'MSFT', label: 'Microsoft' },
  { value: 'TSLA', label: 'Tesla' },
  { value: 'RACE', label: 'Ferrari N.V.' },
];

const chartTypes = [
  {value: 'area', label: 'Area Chart'},
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' }
];

const periods = [
  { value: 'daily', label: '1D' },
  { value: 'weekly', label: '1W' },
  { value: 'monthly', label: '1M' },
  { value: 'yearly', label: '1Y' }
];

const colors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
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
    const baseDataset = {
      label: stockOptions.find(stock => stock.value === selectedStock).label,
      data: mockData[period].stockData[selectedStock].data,
      backgroundColor: colors[0],
      borderColor: colors[0],
      borderWidth: 1,
      opening: mockData[period].stockData[selectedStock].opening,
      highest: mockData[period].stockData[selectedStock].highest,
      lowest: mockData[period].stockData[selectedStock].lowest,
    };
  
    const additionalDatasets = additionalStocks.map((stock, index) => {
      const stockData = mockData[period].stockData[stock];
      return {
        label: stockOptions.find(opt => opt.value === stock).label,
        data: stockData.data,
        backgroundColor: colors[index + 1] || getRandomColor(),
        borderColor: colors[index + 1] || getRandomColor(),
        borderWidth: 1,
        opening: stockData.opening,
        highest: stockData.highest,
        lowest: stockData.lowest,
      };
    });
  
    const data = {
      labels: mockData[period].labels,
      datasets: [baseDataset, ...additionalDatasets],
    };
  
    switch (chartType) {
      case 'area':
        return <AreaChart data={data} />;
      case 'bar':
        return <BarChart data={data} />;
      case 'line':
        return <LineChart data={data} />;
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
          <div className="flex gap-2 mb-6">
            {periods.map((option) => (
              <button
                key={option.value}
                value={option.value}
                onClick={handlePeriodChange}
                className={`p-2 border rounded ${period === option.value ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
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
      <div className="w-3/4 h-full rounded shadow-xl shadow-blue-200">
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
