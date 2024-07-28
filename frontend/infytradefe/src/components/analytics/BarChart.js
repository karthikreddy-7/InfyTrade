import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: USD${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stock Price (USD)',
        },
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
    })),
  };

  return (
    <div className="h-full p-4 bg-white rounded shadow-lg">
      <div className="mb-4">
        <h3>{data.title}</h3>
        {data.datasets.map(dataset => (
          <div key={dataset.label}>
            <p className='flex justify-around font-medium text-sm text-center decoration-2'>
                <p className='text-sky-500'>Opening: USD {dataset.opening.toFixed(2)}</p>
                <p className='text-green-600'>Highest: USD {dataset.highest.toFixed(2)}</p>
                <p className='text-red-600'>Lowest: USD {dataset.lowest.toFixed(2)}</p>
             </p>
          </div>
        ))}
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
