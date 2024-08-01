import React from "react";

const Watchlist = () => {
  const watchlistData = [
    { symbol: "IBM", last: "16.10", change: "+0.15" },
    { symbol: "MSFT", last: "281.15", change: "+4.80" },
    { symbol: "TSLA", last: "82.076", change: "-0.52" },
  ];

  return (
    <div className=" p-2 text-black font-bold  shadow-lg">
      <h3 className="mb-3 text-sm  pl-2 font-bold">Watchlist</h3>
      <table className="w-full border-collapse ">
        <thead>
          <tr>
            <th className="border border-gray-600 p-2 text-xs text-left">
              Symbol
            </th>
            <th className="border border-gray-600 p-2 text-xs text-left">
              Last
            </th>
            <th className="border border-gray-600 p-2 text-xs text-left">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {watchlistData.map((item, index) => (
            <tr key={index}>
              <td className="border text-xs border-gray-600 p-2 text-left">
                {item.symbol}
              </td>
              <td className="border text-xs border-gray-600 p-2 text-left">
                {item.last}
              </td>
              <td className="border text-xs border-gray-600 p-2 text-left">
                {item.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
