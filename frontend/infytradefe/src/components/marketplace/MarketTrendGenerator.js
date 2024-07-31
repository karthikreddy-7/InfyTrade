import React from 'react';

const MarketTrendGenerator = ({ stocks, stockLogos, handleBuyClick, handleSellClick }) => {
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Market Trends</h2>
      {stocks.map((stock) => (
        <div key={stock.symbol} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={stockLogos[stock.symbol]} alt={stock.symbol} className="w-6 h-6 mr-2" />
            <span>{stock.symbol}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg">${parseFloat(stock.currentPrice).toFixed(2)}</span>
            <button
              onClick={() => handleBuyClick(stock.symbol)}
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
            >
              Buy
            </button>
            <button
              onClick={() => handleSellClick(stock.symbol)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketTrendGenerator;
