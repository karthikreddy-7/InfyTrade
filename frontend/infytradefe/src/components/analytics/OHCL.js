import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const OHCL = ({ Stock }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!Stock || !Stock.prices || Stock.prices.length === 0) {
      return;
    }

    const bid = parseFloat(Stock.bid) || 0;
    const ask = parseFloat(Stock.ask) || 0;
    const currentPrices = Stock.prices
      .map((price) => parseFloat(price))
      .filter((price) => !isNaN(price));

    if (currentPrices.length === 0) {
      return;
    }

    const open = parseFloat(currentPrices[0].toFixed(2));
    const high = parseFloat(Math.max(...currentPrices, bid, ask).toFixed(2));
    const low = parseFloat(Math.min(...currentPrices, bid, ask).toFixed(2));
    const close = parseFloat(
      currentPrices[currentPrices.length - 1].toFixed(2)
    );

    const newCandle = {
      x: new Date(),
      y: [open, high, low, close],
    };
    setChartData((prevData) => [...prevData, newCandle]);
  }, [Stock]);

  const options = {
    chart: {
      height: 350,
      type: "candlestick",
    },
    title: {
      text: `CandleStick Chart - ${Stock?.symbol || "No Symbol"}`,
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
    <div>
      <ReactApexChart
        options={options}
        series={[{ data: chartData }]}
        type="candlestick"
        height={430}
        width={790}
        className="mt-4"
      />
    </div>
  );
};

export default OHCL;
