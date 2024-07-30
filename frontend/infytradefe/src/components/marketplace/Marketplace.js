import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyModal from "../orderModel/BuyModal";
import SellModal from "../orderModel/SellModal";
import ModalComponent from "../modal";
import {
  fetchStockByName,
  getGainersAndLosers,
  adjustMarketPrice,
} from "../../api/stocks";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ibmLogo from "../../assests/IBM.jpg";
import msftLogo from "../../assests/msft.png";
import tslaLogo from "../../assests/tsla.png";
import raceLogo from "../../assests/race.png";
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

const stockLogos = {
  IBM: ibmLogo,
  MSFT: msftLogo,
  TSLA: tslaLogo,
  RACE: raceLogo,
};

const Marketplace = () => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [marketPrice, setMarketPrice] = useState("");

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

  const stocks = [ibm, msft, tsla, race];

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

  const handleSeeAllClick = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleBuyClick = (company) => {
    setSelectedCompany(company);
    setIsBuyModalOpen(true);
  };

  const handleSellClick = (company) => {
    setSelectedCompany(company);
    setIsSellModalOpen(true);
  };

  const handleCardClick = (stock) => {
    setSelectedStock(stock);
  };

  const topGainersContent = (
    <>
      {getGainersAndLosers(stocks).gainers.map((stock) => (
        <div key={stock.symbol} className="mb-2 flex justify-between">
          <span>{stock.symbol}</span>
          <span>${stock.price}</span>
        </div>
      ))}
    </>
  );

  const topLosersContent = (
    <>
      {getGainersAndLosers(stocks).losers.map((stock) => (
        <div key={stock.symbol} className="mb-2 flex justify-between">
          <span>{stock.symbol}</span>
          <span>${stock.price}</span>
        </div>
      ))}
    </>
  );

  const buttons = [
    {
      label: "Close",
      color: "danger",
      variant: "light",
      onPress: () => setIsModalOpen(false),
    },
  ];

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-5 overflow-y-auto">
        <header className="flex items-center justify-between mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search for Stocks"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </header>

        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-2">Stocks</h2>
          <div className="flex space-x-7 overflow-x-auto">
            {stocks.map((stock) => {
              const { change, icon } = getPriceChange(
                stock.currentPrice,
                marketPrice
              );
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
                    <span className="font-semibold text-lg">
                      {stock.symbol}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold text-lg">Market Price</div>
                    <div className="flex items-center">
                      <span className="text-2xl">
                        ${parseFloat(stock.currentPrice).toFixed(2)}
                      </span>
                      <span
                        className={`ml-2 text-lg ${
                          change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
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
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-5 rounded-lg shadow col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">
                {selectedStock ? `${selectedStock.symbol} Chart` : "Chart"}
              </h2>
              <button
                className="text-blue-500"
                onClick={() =>
                  handleSeeAllClick(
                    "Market Trend",
                    <div>Market Trend Details</div>
                  )
                }
              >
                See All
              </button>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              {selectedStock ? <div>here display chart</div> : " Chart"}
            </div>
            {selectedStock && (
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-center flex justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Market Price</div>
                  <div className="text-lg">
                    ${parseFloat(selectedStock.price).toFixed(2)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Ask Price</div>
                  <div className="text-lg">${selectedStock.ask}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Bid Price</div>
                  <div className="text-lg">${selectedStock.bid}</div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 col-span-1">
            <div className="bg-blue-100 p-5 rounded-lg shadow mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2">Top Gainers</h2>
                <button
                  className="text-blue-500"
                  onClick={() =>
                    handleSeeAllClick("Top Gainers", topGainersContent)
                  }
                >
                  See All
                </button>
              </div>
              {getGainersAndLosers(stocks).gainers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="mb-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={stockLogos[stock.symbol]}
                      alt={stock.symbol}
                      className="w-6 h-6 mr-2"
                    />
                    <span>{stock.symbol}</span>
                  </div>
                  <span>${parseFloat(stock.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="bg-red-100 p-5 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2">Top Losers</h2>
                <button
                  className="text-blue-500"
                  onClick={() =>
                    handleSeeAllClick("Top Losers", topLosersContent)
                  }
                >
                  See All
                </button>
              </div>
              {getGainersAndLosers(stocks).losers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="mb-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={stockLogos[stock.symbol]}
                      alt={stock.symbol}
                      className="w-6 h-6 mr-2"
                    />
                    <span>{stock.symbol}</span>
                  </div>
                  <span>${parseFloat(stock.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <div className="grid grid-cols-6 gap-4 mb-2">
            <h2 className="text-lg font-semibold col-span-5">Market Trend</h2>
            <button
              className="text-blue-500 col-span-1 text-right"
              onClick={() =>
                handleSeeAllClick(
                  "Market Trend",
                  <div>Market Trend Details</div>
                )
              }
            >
              See All
            </button>
          </div>
          <div className="grid grid-cols-6 gap-5 font-semibold mb-2">
            <div className="col-span-1"> Stock</div>
            <div className="col-span-1"> Bid</div>
            <div className="col-span-1">Ask</div>
            <div className="col-span-1">Order</div>
            <div className="col-span-1">Market Price</div>
            <div className="col-span-1">Change</div>
          </div>
          {stocks.map((stock) => {
            const { change, icon } = getPriceChange(stock.price, marketPrice);
            const bgColor = change > 0 ? "bg-blue-100" : "bg-red-100";
            return (
              <div
                key={stock.symbol}
                className={`grid grid-cols-6 gap-4 mb-2 items-center ${bgColor}`}
              >
                <div className="flex items-center col-span-1">
                  <img
                    src={stockLogos[stock.symbol]}
                    alt={stock.symbol}
                    className="w-6 h-6 mr-2"
                  />
                  <span>{stock.symbol}</span>
                </div>
                <span className="col-span-1">${stock.bid}</span>
                <span className="col-span-1">${stock.ask}</span>
                <span className="col-span-1 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleBuyClick(stock.symbol)}
                  >
                    Buy
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSellClick(stock.symbol)}
                  >
                    Sell
                  </button>
                </span>
                <span className="col-span-1">
                  ${parseFloat(stock.price).toFixed(2)}
                </span>
                <div
                  className={`col-span-1 text-sm ${
                    change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {icon} {change}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside className="w-80 bg-white p-5 shadow-lg overflow-y-auto flex flex-col">
        <div className="bg-white p-5 rounded-lg shadow mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-2">Stock Market News</h2>
            <button className="text-blue-500">See All</button>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Market Hits New High",
                description:
                  "The stock market reached a new high today driven by tech stocks.",
              },
              {
                title: "Federal Reserve Interest Rate Decision",
                description:
                  "The Federal Reserve announces its decision on interest rates.",
              },
              {
                title: "Tech Stocks Surge",
                description:
                  "Tech stocks are surging following positive earnings reports from major companies.",
              },
            ].map((news, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                <h3 className="font-semibold text-md mb-1">{news.title}</h3>
                <p className="text-sm text-gray-700">{news.description}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {isModalOpen && (
        <ModalComponent
          title={modalTitle}
          buttons={buttons}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        >
          {modalContent}
        </ModalComponent>
      )}

      {isBuyModalOpen && (
        <BuyModal
          company={selectedCompany}
          onClose={() => setIsBuyModalOpen(false)}
        />
      )}
      {isSellModalOpen && (
        <SellModal
          company={selectedCompany}
          onClose={() => setIsSellModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Marketplace;
