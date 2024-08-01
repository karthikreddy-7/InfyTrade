import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyModal from "../orderModel/BuyModal";
import SellModal from "../orderModel/SellModal";
import StockCard from "./StockCard";
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
import { Button } from "@nextui-org/react";
import backgroundImage from "../../assests/bgportfolio.jpg";
import { FaChevronDown } from "react-icons/fa";
import AreaChart from "../analytics/AreaChart";
import BarChart from "../analytics/BarChart";
import LineChart from "../analytics/LineChart";
import OHCL from "../analytics/OHCL";

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

const stockTypes = ["IBM", "MSFT", "TSLA", "RACE"];

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
  const [selectedCompany, setSelectedCompany] = useState("IBM");
  const [selectedStock, setSelectedStock] = useState(null);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChartType, setSelectedChartType] = useState("Line Chart");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStockDropdownOpen, setIsStockDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(null);

  const dispatch = useDispatch();
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(initializeIbmStockPricesThunk());
    dispatch(initializeTslaStockPricesThunk());
    dispatch(initializeMsftStockPricesThunk());
    dispatch(initializeRaceStockPricesThunk());

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

  useEffect(() => {
    setChartData(null); // Clear the chart data
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
        stockData = null;
    }
    setChartData(stockData);
  }, [selectedCompany, selectedChartType, ibm, msft, tsla, race]);

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

  const handleStockDropdownToggle = () => {
    setIsStockDropdownOpen(!isStockDropdownOpen);
  };

  const handleChartTypeSelect = (value) => {
    setSelectedChartType(value);
    setIsDropdownOpen(false);
  };

  const handleStockTypeSelect = (value) => {
    setSelectedCompany(value);
    setIsStockDropdownOpen(false);
  };

  const getStockData = (symbol) => {
    return stocks.find((stock) => stock.symbol === symbol) || {};
  };

  const renderChart = () => {
    if (!chartData) return null;
    switch (selectedChartType) {
      case "OHLC Chart":
        return <OHCL Stock={chartData} />;
      case "Line Chart":
        return <LineChart data={chartData} />;
      case "Bar Chart":
        return <BarChart data={chartData} />;
      case "Area Chart":
        return <AreaChart data={chartData} />;
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
                <div className="flex flex-row p-4 text-xl">
                  <div className="dropdown mr-4">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 btn-wide justify-between"
                      onClick={handleDropdownToggle}
                    >
                      {selectedChartType === ""
                        ? "Select the type of chart"
                        : selectedChartType}
                      <FaChevronDown size={18} />
                    </div>
                    {/* <div className="relative">
                   <Button value="add-to-dashboard" className="p-2">
                   Add to Dashboard
                    </Button>
                     </div> */}
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
                  <div className="dropdown mr-4">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 btn-wide justify-between"
                      onClick={handleStockDropdownToggle}
                    >
                      {selectedCompany === ""
                        ? "Select the stock"
                        : selectedCompany}
                      <FaChevronDown size={18} />
                    </div>
                    {isStockDropdownOpen && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        {stockTypes.map((company) => (
                          <li key={company}>
                            <a
                              onClick={() => handleStockTypeSelect(company)}
                              href="#"
                            >
                              {company}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="ml-auto">
                    <Button auto color="primary" className="bg-[#1233ff]">
                      Add to Dashboard
                    </Button>
                  </div>
                </div>
                {renderChart()}
              </div>
            </div>
          </div>
          {isBuyModalOpen && (
            <BuyModal
              isOpen={isBuyModalOpen}
              onClose={() => setIsBuyModalOpen(false)}
              stockSymbol={selectedCompany}
              user={user}
            />
          )}
          {isSellModalOpen && (
            <SellModal
              isOpen={isSellModalOpen}
              onClose={() => setIsSellModalOpen(false)}
              stockSymbol={selectedCompany}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DummyMarketPlace;
