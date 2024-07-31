import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyModal from "../orderModel/BuyModal";
import SellModal from "../orderModel/SellModal";
import StockCard from "./StockCard";
import StockChartGenerator from "./StockChartGenerator";
import TopGainer from "./TopGainer";
import TopLoser from "./TopLoser";
import MarketTrendGenerator from "./MarketTrendGenerator";
import News from "./News";
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

const calculateTopGainersAndLosers = (stocks) => {
  const sortedStocks = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  return {
    gainers: sortedStocks.slice(0, 2),
    losers: sortedStocks.slice(-2),
  };
};

const Marketplace = () => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  const dispatch = useDispatch();
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});
  const user = useSelector((state) => state.auth.user); // Get user details from auth state

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

  useEffect(() => {
    const { gainers, losers } = calculateTopGainersAndLosers(stocks);
    setGainers(gainers);
    setLosers(losers);
  }, [ibm, msft, tsla, race]);

  const handleCardClick = (stock) => {
    setSelectedStock(stock);
  };

  const handleBuyClick = (symbol) => {
    setSelectedCompany(symbol);
    setIsBuyModalOpen(true);
  };

  const handleSellClick = (symbol) => {
    setSelectedCompany(symbol);
    setIsSellModalOpen(true);
  };

  const getStockData = (symbol) => {
    return stocks.find(stock => stock.symbol === symbol) || {};
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-5 overflow-y-auto">
        <div className="flex flex-row gap-2">
          <div className="w-full">
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
  <div className="flex space-x-4 overflow-x-auto">
    {stocks.map((stock) => (
      <div className="flex-shrink-0 w-1/4">
        <StockCard
          key={stock.symbol}
          stock={stock}
          stockLogos={stockLogos}
          handleCardClick={handleCardClick}
        />
      </div>
    ))}
  </div>
</div>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="col-span-3 bg-white p-5 rounded-lg shadow">
                <StockChartGenerator selectedStock={selectedStock} />
              </div>
              <div className="col-span-1 bg-white p-5 rounded-lg shadow">
                <TopGainer gainers={gainers} stockLogos={stockLogos} />
                <TopLoser losers={losers} stockLogos={stockLogos} />
              </div>
            </div>

              <MarketTrendGenerator
                stocks={[ibm, msft, tsla, race]}
                stockLogos={stockLogos}
                handleBuyClick={handleBuyClick}
                handleSellClick={handleSellClick}
              />
          </div>
          <div className="h-screen">
            <News />
          </div>
        </div>
      </main>
      {isBuyModalOpen && (
        <BuyModal
          onClose={() => setIsBuyModalOpen(false)}
          company={selectedCompany}
          marketPrice={getStockData(selectedCompany).currentPrice}
          bidPrice={getStockData(selectedCompany).bid}
          userId={user?.id}
        />
      )}
      {isSellModalOpen && (
        <SellModal
          onClose={() => setIsSellModalOpen(false)}
          company={selectedCompany}
          marketPrice={getStockData(selectedCompany).currentPrice}
          askPrice={getStockData(selectedCompany).ask}
          userId={user?.id}
        />
      )}
    </div>

  );
};

export default Marketplace;
