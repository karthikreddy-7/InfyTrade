import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StockCard = ({ stock, stockLogos, handleCardClick }) => {
  const getPriceChange = (price, avgPrice) => {
    const change = (parseFloat(price) - parseFloat(avgPrice)).toFixed(2);
    return {
      change,
      icon:
        change > 0 ? (
          <FaArrowUp className="text-green-500" />
        ) : (
          <FaArrowDown className="text-red-500" />
        ),
    };
  };

  const { change, icon } = getPriceChange(stock.currentPrice, stock.currentPrice);
  const bgColor = change > 0 ? "bg-blue-100" : "bg-red-100";

  return (
    <div
      key={stock.symbol}
      className={`p-6 rounded-lg shadow min-w-max cursor-pointer ${bgColor}`}
      onClick={() => handleCardClick(stock)}
    >
      <div className="flex items-center mb-3">
        <img
          src={stockLogos[stock.symbol]}
          alt={stock.symbol}
          className="w-12 h-12 mr-4"
        />
        <span className="font-semibold text-lg">{stock.symbol}</span>
      </div>
      <div className="mb-4">
        <div className="font-bold text-lg">Market Price</div>
        <div className="flex items-center">
          <span className="text-2xl">${parseFloat(stock.currentPrice).toFixed(2)}</span>
          <span className={`ml-2 text-lg ${change > 0 ? "text-green-500" : "text-red-500"}`}>
            {icon} {change}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-lg">Bid Price: ${stock.bid}</div>
        <div className="text-lg">Ask Price: ${stock.ask}</div>
      </div>
    </div>
  );
};

export default StockCard;
