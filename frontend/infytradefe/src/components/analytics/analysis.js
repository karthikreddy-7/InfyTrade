import React, { useState } from "react";
import BarChart from "./BarChart.js";
import LineChart from "./LineChart.js";
import AreaChart from "./AreaChart.js";
import { mockData } from "./mockdata.ts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const stockOptions = [
  { value: "IBM", label: "IBM" },
  { value: "MSFT", label: "Microsoft" },
  { value: "TSLA", label: "Tesla" },
  { value: "RACE", label: "Ferrari N.V." },
];

const chartTypes = [
  { value: "area", label: "Area Chart" },
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
];

const periods = [
  { value: "daily", label: "1D" },
  { value: "weekly", label: "1W" },
  { value: "monthly", label: "1M" },
  { value: "yearly", label: "1Y" },
];

const colors = [
  "rgba(255, 99, 132, 0.6)",
  "rgba(54, 162, 235, 0.6)",
  "rgba(75, 192, 192, 0.6)",
  "rgba(153, 102, 255, 0.6)",
  "rgba(255, 159, 64, 0.6)",
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
    if (event.target.value !== "line") {
      setAdditionalStocks([]);
    }
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  const handleAdditionalStockChange = (e, value) => {
    if (e.target.checked) {
      setAdditionalStocks((prev) => [...prev, value]);
    } else {
      setAdditionalStocks((prev) => prev.filter((stock) => stock !== value));
    }
  };

  const renderChart = () => {
    const baseDataset = {
      label: stockOptions.find((stock) => stock.value === selectedStock).label,
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
        label: stockOptions.find((opt) => opt.value === stock).label,
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
      case "area":
        return <AreaChart data={data} />;
      case "bar":
        return <BarChart data={data} />;
      case "line":
        return <LineChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row  justify-center items-center">
      <div className="card bg-gray-100 w-2/6 h-screen rounded-none">
        <div className="card-body">
          <div>
            <h2 className="card-title font-bold text-2xl">Stock Analysis</h2>
            <p className="text-sm m-2 text-gray-800">
              Stock Analysis Provides real time data analytics with the help of
              different types of charts and plots.
            </p>
          </div>
          <div className="flex flex-col gap-8 mt-4">
            <Select
              label="Select a stock"
              value={selectedStock}
              onChange={handleStockChange}
              className="max-w-xl"
            >
              {stockOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Select chart type"
              value={chartType}
              onChange={handleChartTypeChange}
              className="max-w-xl"
            >
              {chartTypes.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-4 gap-2 mb-2">
              {periods.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handlePeriodChange(option.value)}
                  color={period === option.value ? "primary" : "default"}
                  className={`p-2 border rounded ${
                    period === option.value
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {chartType === "line" && (
              <div className="flex flex-col items-start">
                {stockOptions
                  .filter((stock) => stock.value !== selectedStock)
                  .map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 mb-2"
                    >
                      <Checkbox
                        defaultSelected={additionalStocks.includes(
                          option.value
                        )}
                        size="md"
                        onChange={(e) =>
                          handleAdditionalStockChange(e, option.value)
                        }
                      >
                        {option.label}
                      </Checkbox>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-screen w-[50vw] p-4 flex flex-1 justify-center items-center">
        <div className="h-[100vh] min-w-full justify-center items-center">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Analysis;
