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
import backgroundImage from "../../assests/bgportfolio.jpg";
import { RadioGroup, Radio } from "@nextui-org/react";
import AreaChart from "../analytics/AreaChart";
import BarChart from "../analytics/BarChart";
import LineChart from "../analytics/LineChart";
import OHCL from "../analytics/OHCL";
import { FaChevronDown } from "react-icons/fa";

const stockLogos = {
  IBM: ibmLogo,
  MSFT: msftLogo,
  TSLA: tslaLogo,
  RACE: raceLogo,
};

const chartTypes = [
  { label: "OHLC Chart", value: "OHLC Chart" },
  { label: "Line Chart", value: "Line Chart" },
  { label: "Bar Chart", value: "Bar Chart" },
  { label: "Area Chart", value: "Area Chart" },
];

const calculateTopGainersAndLosers = (stocks) => {
  const sortedStocks = [...stocks].sort(
    (a, b) => b.changePercent - a.changePercent
  );
  return {
    gainers: sortedStocks.slice(0, 2),
    losers: sortedStocks.slice(-2),
  };
};

const DummyMarketPlace = () => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [selectedChartType, setSelectedChartType] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const stocks = [ibm, msft, tsla, race];

  useEffect(() => {
    const { gainers, losers } = calculateTopGainersAndLosers(stocks);
    setGainers(gainers);
    setLosers(losers);
    if (race?.currentPrice !== undefined) {
      setLoading(false);
    }
  }, [ibm, msft, tsla, race]);

  const handleCardClick = (stock) => {
    setSelectedCompany(stock.symbol);
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

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChartTypeSelect = (value) => {
    setSelectedChartType(value);
    setIsDropdownOpen(false);
  };

  const getStockData = (symbol) => {
    return stocks.find((stock) => stock.symbol === symbol) || {};
  };

  const renderChart = () => {
    let stockData;
    switch (selectedCompany) {
      case "IBM":
        stockData = ibm;
        break;
      case "MSFT":
        stockData = msft;
        break;
      case "TSLA":
        stockData = tsla;
        break;
      case "RACE":
        stockData = race;
        break;
      default:
        return null;
    }

    if (!stockData) return null;
    console.log(stockData);
    switch (selectedChartType) {
      case "OHLC Chart":
        return <OHCL Stock={stockData} />;
      case "Line Chart":
        return <LineChart data={stockData} />;
      case "Bar Chart":
        return <BarChart data={stockData} />;
      case "Area Chart":
        return <AreaChart data={stockData} />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div
          className="h-screen w-full flex"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div>
                <MarketTrendGenerator
                  stocks={[ibm, msft, tsla, race]}
                  stockLogos={stockLogos}
                  handleBuyClick={handleBuyClick}
                  handleSellClick={handleSellClick}
                />
              </div>
              <div className="grid grid-cols-2 gap-0">
                <TopGainer gainers={gainers} stockLogos={stockLogos} />
                <TopLoser losers={losers} stockLogos={stockLogos} />
              </div>
              <div>
                <News />
              </div>
            </div>
            <div className="flex flex-col h-full w-full">
              <div className="grid grid-cols-4 gap-0 w-full">
                {stocks.map((stock) => (
                  <StockCard
                    key={stock.symbol}
                    stock={stock}
                    stockLogos={stockLogos}
                    handleCardClick={handleCardClick}
                  />
                ))}
              </div>
              <div className="bg-white h-full w-full p-1">
                <div className="flex flex-col p-4 text-xl">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 btn-wide justify-between"
                      onClick={handleDropdownToggle}
                    >
                      {selectedChartType == ""
                        ? "Select the type of chart"
                        : selectedChartType}
                      <FaChevronDown size={18} />
                    </div>
                    {isDropdownOpen && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        {chartTypes.map((chart) => (
                          <li key={chart.value}>
                            <a
                              onClick={() => handleChartTypeSelect(chart.value)}
                              href="#"
                            >
                              {chart.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex-1 max-h-[30vh] items-center justify-center">
                  {renderChart()}
                </div>
              </div>
            </div>
          </div>
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
      )}
    </>
  );
};

export default DummyMarketPlace;