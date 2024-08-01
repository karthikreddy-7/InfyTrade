import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const StockChartGenerator = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("candlestick");
  const [selectedStock, setSelectedStock] = useState("IBM");
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});

  useEffect(() => {
    const updateChartData = (stockData) => {
      if (stockData?.prices) {
        const bid = parseFloat(stockData.bid);
        const ask = parseFloat(stockData.ask);
        const currentPrices = stockData.prices.map((price) =>
          parseFloat(price)
        );

        const open = parseFloat(currentPrices[0]?.toFixed(2) || 0);
        const high = parseFloat(
          Math.max(...currentPrices, bid, ask).toFixed(2)
        );
        const low = parseFloat(Math.min(...currentPrices, bid, ask).toFixed(2));
        const close = parseFloat(
          currentPrices[currentPrices.length - 1]?.toFixed(2) || 0
        );

        const newCandle = {
          x: new Date(),
          y: [open, high, low, close],
        };

        setChartData((prevData) => [...prevData, newCandle]);
      }
    };

    const stockData =
      { IBM: ibm, TSLA: tsla, MSFT: msft, RACE: race }[selectedStock] || {};
    updateChartData(stockData);
  }, [selectedStock, ibm, tsla, msft, race]);

  const options = {
    chart: {
      height: 350,
      type: chartType,
    },
    title: {
      text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart - ${
        selectedStock || ""
      }`,
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00E396",
          downward: "#FF4560",
        },
      },
    },
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
    setChartData([]); // Reset chart data when changing stock
  };

  return (
    <div className="bg-gray-200 h-72 rounded-lg flex flex-col items-center justify-center">
    <div className="flex items-center w-full p-4 bg-white rounded-t-lg">
      <div className="flex flex-grow items-center">
        <select
          onChange={handleStockChange}
          value={selectedStock}
          className="mr-4 p-2 border border-gray-300 rounded"
        >
          <option value="IBM">IBM</option>
          <option value="TSLA">TSLA</option>
          <option value="MSFT">MSFT</option>
          <option value="RACE">RACE</option>
        </select>
        <select
          onChange={handleChartTypeChange}
          value={chartType}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="candlestick">Candlestick</option>
          <option value="line">Line</option>
          <option value="ohlc">OHLC</option>
        </select>
      </div>
    </div>
    {selectedStock && chartData.length > 0 ? (
      <ReactApexChart
        options={options}
        series={[{ data: chartData }]}
        type={chartType}
        height={270}
        width={500}
        className="mt-4"
      />
    ) : (
      <p className="text-gray-600 mt-4">Select a stock to view the chart</p>
    )}
  </div>
  );
};

export default StockChartGenerator;
