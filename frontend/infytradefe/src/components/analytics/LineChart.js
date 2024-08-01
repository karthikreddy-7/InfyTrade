import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Button } from "@nextui-org/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const LineChart = ({ data, onAddToDashboard }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
          display: false, // Hide x-axis title
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Price (USD)",
        },
        beginAtZero: false,
      },
    },
  };

  // Transforming stockData to chartData
  const prices = data?.prices?.map((price) => parseFloat(price));
  const labels = prices?.map((_, index) => `Time ${index + 1}`);
  const chartData = {
    labels,
    datasets: [
      {
        label: data.symbol,
        data: prices,
        borderColor: "rgba(192,192,192,1)",
        backgroundColor: "rgba(0,0,0)",
      },
    ],
  };

  // Calculate opening, highest, and lowest prices
  const opening = prices[0];
  const highest = Math.max(...prices);
  const lowest = Math.min(...prices);

  // Handle dropdown selection
  const handleSelectChange = (event) => {
    if (event.target.value === "add-to-dashboard") {
      onAddToDashboard();
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-around font-medium text-sm text-center w-full">
          <p className="text-sky-500">Opening: USD {opening.toFixed(2)}</p>
          <p className="text-green-600">Highest: USD {highest.toFixed(2)}</p>
          <p className="text-red-600">Lowest: USD {lowest.toFixed(2)}</p>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
