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
    gainers: sortedStocks.slice(0, 3),
    losers: sortedStocks.slice(-3),
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
    const stocks = [ibm, msft, tsla, race];
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

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-5 overflow-y-auto">
      <div className="flex flex-row gap-2">
        <div>
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
          {stocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              stockLogos={stockLogos}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-5 rounded-lg shadow col-span-2">
          <StockChartGenerator selectedStock={selectedStock} />
        </div>
        </div>


        <div className="grid grid-cols-1 gap-4 col-span-1">
          <TopGainer gainers={gainers} stockLogos={stockLogos} />
      </div>
          <TopLoser losers={losers} stockLogos={stockLogos} />

        <div className="bg-white p-5 rounded-lg shadow">
        <MarketTrendGenerator
          stocks={[ibm, msft, tsla, race]}
          stockLogos={stockLogos}
          handleBuyClick={handleBuyClick}
          handleSellClick={handleSellClick}
        />
        </div>
        </div>
        <div className="h-screen
        ">
        <News />
        </div>
        </div>

      </main>
      {isBuyModalOpen && (
        <BuyModal
          isOpen={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          company={selectedCompany}
        />
      )}
      {isSellModalOpen && (
        <SellModal
          isOpen={isSellModalOpen}
          onClose={() => setIsSellModalOpen(false)}
          company={selectedCompany}
        />
      )}
    </div>
  );
};

export default Marketplace;
