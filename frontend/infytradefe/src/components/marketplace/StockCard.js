import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { calculateChangePercentage } from "./MarketTrendGenerator";

const StockCard = ({ stock, stockLogos, handleCardClick }) => {
  const prices = stock.prices || [];
  const previousClose =
    prices.length > 1 ? prices[prices.length - 2] : stock.currentPrice;

  const getPriceChange = (currentPrice, previousClose) => {
    const change = (
      parseFloat(currentPrice) - parseFloat(previousClose)
    ).toFixed(1);
    const percentageChange = calculateChangePercentage(
      currentPrice,
      previousClose
    ).toFixed(1);
    return {
      change,
      percentageChange,
      icon:
        percentageChange > 0 ? (
          <FaArrowUp className="text-green-500" />
        ) : (
          <FaArrowDown className="text-red-500" />
        ),
    };
  };

  const { change, percentageChange, icon } = getPriceChange(
    stock.currentPrice,
    previousClose
  );

  return (
    <div
      key={stock.symbol}
      className="flex flex-col justify-center items-start h-[20vh] w-[14vw] max-w-xs pl-6 pr-14 gap-2 cursor-pointer bg-white"
      onClick={() => handleCardClick(stock)}
    >
      <div className="mt-">
        <span className="font-semibold text-lg">{stock.symbol}</span>
      </div>
      <div className="">
        <div className="flex flex-col">
          <div className="font-bold text-xs">Market Price:</div>
          <div className="flex flex-row">
            <span className="text-sm font-semibold">
              ${parseFloat(stock.currentPrice).toFixed(1)}
            </span>
            <span
              className={`text-xs m-1 ${
                percentageChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {icon}
            </span>
          </div>
        </div>
      </div>
      <div className=" space-y-1 font-semibold">
        <div className="text-xs">
          Bid Price: ${parseFloat(stock.bid).toFixed(1)}
        </div>
        <div className="text-xs">
          Ask Price: ${parseFloat(stock.ask).toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default StockCard;
