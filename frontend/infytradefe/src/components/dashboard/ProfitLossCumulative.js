import React from "react";
import { Line } from "react-chartjs-2";

const ProfitLossCumulative = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Profit/Loss Cumulative",
        data: [12000, 19000, 3000, 5000, 20000, 30000, 40000],
        fill: false,
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=" p-1 text-white">
      <h3 className="mb-2 text-sm pt-2  text-black font-bold">
        Profit/Loss Cumulative
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProfitLossCumulative;
