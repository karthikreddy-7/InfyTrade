import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import { CircularProgress } from "@nextui-org/react";
import error from "../../assests/error.png";
import robo from "../../assests/robo.jpg";

function AutomatedTradingSystem() {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);
  const [selectedStock, setSelectedStock] = useState("TATA");
  const [targetPrice, setTargetPrice] = useState("");
  const [desiredQuantity, setDesiredQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [relatedStock, setRelatedStock] = useState("TCS");
  const [stockOptions, setStockOptions] = useState([]);
  const [relatedStockOptions, setRelatedStockOptions] = useState([]);
  const [result, setResult] = useState(false);
  const [showInfoMessage, setShowInfoMessage] = useState(false);

  useEffect(() => {
    const fetchStockOptions = async () => {
      setTimeout(() => {
        setStockOptions(["TATA", "RELIANCE", "INFY", "WIPRO", "HDFC"]);
        setRelatedStockOptions(["TCS", "INFY", "WIPRO", "HDFC", "RELIANCE"]);
      }, 1000);
    };

    fetchStockOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedStock,
      targetPrice,
      action,
      relatedStock,
    });
    setResult(true);
    setShowInfoMessage(false);
    setTimeout(() => {
      setResult(false);
      setShowInfoMessage(true);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="flex h-screen bg-gray-100">
          <div className="card bg-gray-50 w-2/5 rounded-none">
            <div className="card-body shadow-md  h-screen">
              <div className="flex flex-col text-center justify-center items-center">
                <h2 className="card-title text-2xl font-bold text-gray-900 mb-1">
                  Automated Trading System
                </h2>
                <p className=" text-gray-600 text-center">
                  Choose which stock you want to buy or sell based on the price
                  of another stock.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-base font-medium text-gray-800 mb-1">
                    Target Stock
                  </label>
                  <select
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {stockOptions.map((stock, index) => (
                      <option key={index} value={stock}>
                        {stock}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-base font-medium text-gray-800 mb-1">
                    Target Price
                  </label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Enter target price"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-base font-medium text-gray-800 mb-1">
                    Action
                  </label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-base font-medium text-gray-800 mb-1">
                    Desired Stock
                  </label>
                  <select
                    value={relatedStock}
                    onChange={(e) => setRelatedStock(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {relatedStockOptions.map((stock, index) => (
                      <option key={index} value={stock}>
                        {stock}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-base font-medium text-gray-800 mb-2">
                    Desired Quantity
                  </label>
                  <input
                    type="number"
                    value={desiredQuantity}
                    onChange={(e) => setDesiredQuantity(e.target.value)}
                    placeholder="Enter Desired Quantity"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 mt-2 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Set Rule
                </button>
              </form>
            </div>
          </div>
          <div className="w-3/5 bg-gray-100  flex items-center justify-center">
            {!result && !showInfoMessage ? (
              <img
                src={robo}
                className="object-fill w-full h-full"
                alt="No result"
              />
            ) : null}
            {result ? (
              <div className="w-full h-screen m-24 flex items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            ) : showInfoMessage ? (
              <div className="flex flex-col w-3/5 text-start justify-center items-center">
                <img
                  src={error}
                  className="object-contain w-40 mb-4"
                  alt="Error"
                />
                <p className="text-lg font-semibold text-gray-800 text-center">
                  Your desired details have been added to our backend for
                  creating a Scheduled Function.
                </p>
                <p className="text-gray-600 text-center">
                  Due to infrastructure constraints and restrictions to access
                  real-world stocks, we cannot fully implement the feature.
                  Sorry for the inconvenience caused.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default AutomatedTradingSystem;
