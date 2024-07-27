import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { mockData } from "./mockdata.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const stockOptions = [
  { value: 'IBM', label: 'IBM' },
  { value: 'MSFT', label: 'Microsoft' },
  { value: 'TSLA', label: 'Tesla' },
  { value: 'RACE', label:'Ferrari N.V.'}
];

function BarChart() {
  const [selectedStock, setSelectedStock] = useState(stockOptions[0].value);

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const data = mockData[selectedStock];

  return (
    <>
      <div className="barchart-container">
        <h2>Stock Price Over Time</h2>
        <select value={selectedStock} onChange={handleStockChange}>
          {stockOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: $${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Stock Price (INR)',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default BarChart;
