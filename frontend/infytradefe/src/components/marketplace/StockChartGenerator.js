import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const StockChartGenerator = ({ selectedStock }) => {
  const [chartData, setChartData] = useState([]);
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});

  useEffect(() => {
    if (selectedStock) {
      const stockData =
        { IBM: ibm, TSLA: tsla, MSFT: msft, RACE: race }[
          selectedStock.symbol
        ] || {};
      if (stockData?.prices) {
        const bid = parseFloat(stockData.bid);
        const ask = parseFloat(stockData.ask);
        const currentPrices = stockData?.prices.map((price) =>
          parseFloat(price)
        );

        // Calculate OHLC values with 2 decimal precision
        const open = parseFloat(currentPrices[0].toFixed(2));
        const high = parseFloat(
          Math.max(...currentPrices, bid, ask).toFixed(2)
        );
        const low = parseFloat(Math.min(...currentPrices, bid, ask).toFixed(2));
        const close = parseFloat(
          currentPrices[currentPrices.length - 1].toFixed(2)
        );

        const newCandle = {
          x: new Date(),
          y: [open, high, low, close],
        };
        setChartData((prevData) => [...prevData, newCandle]);
      }
    }
  }, [selectedStock, ibm, tsla, msft, race]);

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    title: {
      text: `CandleStick Chart - ${selectedStock?.symbol}`,
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

  return (
    <div className="bg-gray-200 h-72 rounded-lg flex items-center justify-center">
      {selectedStock ? (
        <ReactApexChart
          options={options}
          series={[{ data: chartData }]}
          type="candlestick"
          height={270}
          width={500}
          className="mt-4"
        />
      ) : (
        "Select a stock to view the chart"
      )}
    </div>
  );
};

export default StockChartGenerator;
