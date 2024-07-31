import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeIbmStockPricesThunk,
  initializeTslaStockPricesThunk,
  initializeMsftStockPricesThunk,
  initializeRaceStockPricesThunk,
  updateIbmStockPriceThunk,
  updateTslaStockPriceThunk,
  updateMsftStockPriceThunk,
  updateRaceStockPriceThunk,
} from "../../redux/stockThunks";

function Dummymarketplace() {
  const dispatch = useDispatch();
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});

  useEffect(() => {
    // Fetch initial stock data
    dispatch(initializeIbmStockPricesThunk());
    dispatch(initializeTslaStockPricesThunk());
    dispatch(initializeMsftStockPricesThunk());
    dispatch(initializeRaceStockPricesThunk());

    // Update stock prices every 2 seconds
    const intervalId = setInterval(() => {
      dispatch(updateIbmStockPriceThunk());
      dispatch(updateTslaStockPriceThunk());
      dispatch(updateMsftStockPriceThunk());
      dispatch(updateRaceStockPriceThunk());
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Function to render stock data
  const renderStockData = (stock) => {
    if (!stock || !stock.prices || !Array.isArray(stock.prices)) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-2">
            Loading...
          </td>
        </tr>
      );
    }

    const { currentPrice, bid, ask } = stock;
    return (
      <tr>
        <td className="py-2 px-4 border">{currentPrice || "N/A"}</td>
        <td className="py-2 px-4 border">{bid || "N/A"}</td>
        <td className="py-2 px-4 border">{ask || "N/A"}</td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Marketplace</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">
                Stock
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">
                Current Price
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Bid</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Ask</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">IBM</td>
              {renderStockData(ibm)}
            </tr>
            <tr>
              <td className="py-2 px-4 border">TSLA</td>
              {renderStockData(tsla)}
            </tr>
            <tr>
              <td className="py-2 px-4 border">MSFT</td>
              {renderStockData(msft)}
            </tr>
            <tr>
              <td className="py-2 px-4 border">RACE</td>
              {renderStockData(race)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dummymarketplace;
