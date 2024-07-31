import React from "react";

const TopLoser = ({ losers, stockLogos }) => {
  return (
    <div className="bg-red-200 p-2">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-lg text-gray-600 font-bold">Top Gainers</h2>
        <button className="text-blue-700 text-xs font-bold">See All</button>
      </div>
      {losers.map((stock) => (
        <div
          key={stock.symbol}
          className="mb-2 flex items-center justify-between text-gray-800 font-bold"
        >
          <div className="flex items-center text-sm font-bold">
            <span>{stock.symbol}</span>
          </div>
          <span className="text-sm">
            $ {parseFloat(stock.currentPrice).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopLoser;
