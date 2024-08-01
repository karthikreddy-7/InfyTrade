import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import TradesByStrategies from "./TradesByStrategies";
import ProfitLossCumulative from "./ProfitLossCumulative";
import Watchlist from "./Watchlist";
import { fetchAndDispatchDashboards } from "../../api/auth";
import OHCL from "../analytics/OHCL";
import LineChart from "../analytics/LineChart";
import BarChart from "../analytics/BarChart";
import AreaChart from "../analytics/AreaChart";
import { setDashboards } from "../../redux/action";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);
  const [dashboards, setDashboard] = useState();
  const [chartData, setChartData] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState("OHLC");
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("IBM");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const ibm = useSelector((state) => state.ibm || {});
  const tsla = useSelector((state) => state.tsla || {});
  const msft = useSelector((state) => state.msft || {});
  const race = useSelector((state) => state.race || {});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchAndDispatchDashboards(user.id, dispatch)
        .then((data) => {
          dispatch(setDashboards(data.dashboards));
          setDashboard(data);
        })
        .catch((error) => {
          console.error("Failed to fetch dashboards:", error);
        });
    }
  }, [user, dispatch]);

  useEffect(() => {
    let stockData;
    switch (selectedStockSymbol) {
      case "IBM":
        stockData = ibm;
        break;
      case "TSLA":
        stockData = tsla;
        break;
      case "MSFT":
        stockData = msft;
        break;
      case "RACE":
        stockData = race;
        break;
      default:
        stockData = {};
    }
    setChartData(stockData);
  }, [selectedStockSymbol, ibm, msft, tsla, race]);

  const renderChart = () => {
    if (!chartData) return null;
    switch (selectedChartType.toLowerCase()) {
      case "ohlc":
        return <OHCL Stock={chartData} />;
      case "line":
        return <LineChart data={chartData} />;
      case "bar":
        return <BarChart data={chartData} />;
      case "area":
        return <AreaChart data={chartData} />;
      default:
        return <p>No chart type found</p>;
    }
  };

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-row h-screen">
          <div className="flex-grow border-b-black border-small flex items-center justify-center">
            <p className="font-bold text-2xl">
              No dashboards available to display
            </p>
          </div>
          <div className="w-1/3 flex flex-col bg-gray-100">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <TradesByStrategies />
              </div>
              <div className="flex-1">
                <ProfitLossCumulative />
              </div>
              <div className="flex-1">
                <Watchlist />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
