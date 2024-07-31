import React from "react";
import { Badge, BadgeDelta } from "@tremor/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const MarketTrendGenerator = ({
  stocks,
  stockLogos,
  handleBuyClick,
  handleSellClick,
}) => {
  const getChangeIcon = (percentage) => {
    return percentage >= 0 ? (
      <FaArrowUp className="text-green-500 font-bold" />
    ) : (
      <FaArrowDown className="text-red-500 font-bold" />
    );
  };

  return (
    <>
      {stocks && (
        <div className="text-xs">
          <div className="overflow-x-auto h-full bg-white  shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold pl-2 m-1 text-gray-600">
              Market Trends
            </h2>
            <table className="min-w-[38vw] bg-white  overflow-hidden">
              <thead>
                <tr className=" text-left text-sm border-b border-gray-300">
                  <th className="p-2">Stock</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Ask</th>
                  <th className="p-3">Bid</th>
                  <th className="p-3">Change</th>
                  <th className="p-3 pl-12">Order</th>
                </tr>
              </thead>
              <tbody>
                {stocks?.map((stock) => {
                  const prices = stock.prices || [];
                  const previousClose =
                    prices.length > 1
                      ? prices[prices.length - 2]
                      : stock.currentPrice;
                  const changePercentage = calculateChangePercentage(
                    stock.currentPrice,
                    previousClose
                  );

                  return (
                    <tr
                      key={stock.symbol}
                      className="border-b font-semibold border-gray-200"
                    >
                      <td className="p-2 flex items-center">{stock.symbol}</td>
                      <td className="p-1">
                        {parseFloat(stock.currentPrice).toFixed(2)}
                      </td>
                      <td className="p-3">{stock.ask}</td>
                      <td className="p-3">{stock.bid}</td>
                      <td className="p-3 flex items-center font-bold">
                        {getChangeIcon(changePercentage)}
                        <span
                          className={`ml-1  ${
                            changePercentage >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {Math.abs(changePercentage).toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleBuyClick(stock.symbol)}
                          className="btn btn-xs ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => handleSellClick(stock.symbol)}
                          className="btn btn-xs ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export const calculateChangePercentage = (currentPrice, previousClose) => {
  if (previousClose === 0) return 0;
  return ((currentPrice - previousClose) / previousClose) * 100;
};

export default MarketTrendGenerator;
