import React from 'react';

const TopLoser = ({ losers, stockLogos }) => {
  return (
    <div className="bg-red-100 p-5 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-2">Top Losers</h2>
        <button className="text-blue-500">See All</button>
      </div>
      {losers.map((stock) => (
        <div key={stock.symbol} className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <img src={stockLogos[stock.symbol]} alt={stock.symbol} className="w-6 h-6 mr-2" />
            <span>{stock.symbol}</span>
          </div>
          <span>${parseFloat(stock.currentPrice).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default TopLoser;
