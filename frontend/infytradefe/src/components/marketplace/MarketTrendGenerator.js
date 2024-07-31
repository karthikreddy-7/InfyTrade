import React from 'react';

const MarketTrendGenerator = ({ stocks, stockLogos, handleBuyClick, handleSellClick }) => {
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Market Trends</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border-none">Stock</th>
              <th className="p-2 border-none">Price</th>
              <th className="p-2 border-none">Ask</th>
              <th className="p-2 border-none">Bid</th>
              <th className="p-2 border-none">Order</th>
              <th className="p-2 border-none">Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="border-none">
                <td className="p-2 flex items-center border-none">
                  <img src={stockLogos[stock.symbol]} alt={stock.symbol} className="w-6 h-6 mr-2" />
                  {stock.symbol}
                </td>
                <td className="p-2 border-none">${parseFloat(stock.currentPrice).toFixed(2)}</td>
                <td className="p-2 border-none">{stock.ask}</td>
                <td className="p-2 border-none">{stock.bid}</td>
                <td className="p-2 border-none">
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
                </td>
                <td className="p-2 border-none">{stock.changePercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTrendGenerator;
