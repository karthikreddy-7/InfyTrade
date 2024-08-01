import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import MonthlyRetail from "./MonthlyRetail";
import NumberOfTrades from "./NumberOfTrades";
import Technicals from "./Technicals";
import Purchases from "./Purchases";
import TradesByStrategies from "./TradesByStrategies";
import ProfitLossCumulative from "./ProfitLossCumulative";
import Watchlist from "./Watchlist";
import { fetchAndDispatchDashboards } from "../../api/auth";
import AreaChart from "../analytics/AreaChart";
import BarChart from "../analytics/BarChart";
import LineChart from "../analytics/LineChart";
import OHCL from "../analytics/OHCL";
import Alert from "../alert";


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);
  const dashboards = useSelector((state) => state.dashboards);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(dashboards);
    if (user?.id){
      fetchAndDispatchDashboards(user.id, dispatch).catch((error) => {
        console.error("Failed to fetch dashboards:", error);
      });
    }

  }, [user]);

  const renderChart = (widget) => {
    console.log(widget);
    switch (widget.chartType) {
      // case "OHLC":
      //   return <OHCL Stock={chartData} />;
      // case "Line":
      //   return <LineChart data={chartData} />;
      // case "Bar":
      //   return <BarChart data={chartData} />;
      // case "Area":
      //   return <AreaChart data={chartData} />;
      // default:
      //   return null;
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
            <div className="grid grid-cols-2 gap-4 p-4">
              {dashboards && dashboards.length > 0 && dashboards[0].widgets.slice(0, 4).map((widget) => (
                <div key={widget.id} className="p-2 border rounded shadow">
                  <h3 className="text-lg font-semibold">{widget.stockSymbol}</h3>
                  {renderChart(widget)}
                </div>
              ))}
            </div>
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
