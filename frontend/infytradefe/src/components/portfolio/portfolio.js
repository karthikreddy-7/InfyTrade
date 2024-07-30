import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  CircularProgress,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  fetchPortfolioData,
  fetchUserHoldings,
} from "../../api/portfolioHoldings";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";

import { IBMData } from "../../utilities/IBMmock";
import backgroundImage from "../../assests/bgportfolio.jpg";

function Portfolio() {
  const user = useSelector((state) => state.auth.user);
  const [portfolioData, setPortfolioData] = useState([]);
  const [holdingsData, setHoldingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let portfolio = user.portfolios || [];
        let holdings = user.holdings || [];

        if (portfolio.length === 0) {
          const portfolioResponse = await fetchPortfolioData(user.id);
          portfolio = portfolioResponse || [];
        }
        if (holdings.length === 0) {
          const holdingsResponse = await fetchUserHoldings(user.id);
          holdings = holdingsResponse || [];
        }

        setHoldingsData(holdings);
        setPortfolioData(portfolio);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const Portfoliocolumns = [
    { key: "stock", label: "Stock" },
    { key: "type", label: "Type" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "transactionDate", label: "Date" },
  ];

  const Holdingscolumns = [
    { key: "stock", label: "Stock" },
    { key: "quantity", label: "Quantity" },
    { key: "averagePrice", label: "Average Price" },
  ];

  const Portfoliorows = portfolioData?.map((item) => ({
    key: item.id,
    stock: item.stock,
    type: item.type,
    quantity: item.quantity,
    price: item.price,
    transactionDate: new Date(item.transactionDate).toLocaleDateString(),
  }));

  const Holdingsrows = holdingsData?.map((item) => ({
    key: item.id,
    stock: item.stock,
    quantity: item.quantity,
    averagePrice: item.averagePrice,
  }));

  const filteredData = IBMData.map((item) => ({
    month: new Date(item.created_at).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    Performance: parseFloat(item.price),
  }));

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <div
            className=" h-screen"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" h-screen">
              <div>
                <h1 className="text-2xl p-4 font-bold">Welcome Karthik !</h1>
                <p className="font-semibold ml-8 text-xl">
                  Your personalised Portfolio is here:
                </p>
              </div>
              <div className="stats shadow m-4 grid grid-cols-1 md:grid-cols-5 gap-1">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Total Trades</div>
                  <div className="stat-value text-primary">25.6K</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Profit Earned</div>
                  <div className="stat-value text-secondary">2.6M</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
                <div className="stat text-primary">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Current Ranking</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-value">86%</div>
                  <div className="stat-title">Tasks done</div>
                  <div className="stat-desc text-secondary">
                    31 tasks remaining
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Most Traded Sector</div>
                  <div className="stat-value">Tech</div>
                  <div className="stat-desc">Jan 1st - Jul 1st</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
                {/* Portfolio Table */}
                <div className="p-2">
                  <h2 className="text-left text-2xl text-gray-800 font-bold mb-2 ml-4">
                    Transaction History
                  </h2>
                  <Table
                    aria-label="Portfolio table"
                    className="w-full min-h-[40vh] max-h-[40vh]"
                  >
                    <TableHeader columns={Portfoliocolumns}>
                      {(Portfoliocolumns) => (
                        <TableColumn
                          key={Portfoliocolumns.key}
                          className="font-bold text-sm"
                        >
                          {Portfoliocolumns.label}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      items={Portfoliorows}
                      emptyContent="No rows to display."
                    >
                      {(item) => (
                        <TableRow key={item.key}>
                          {(columnKey) => (
                            <TableCell>{item[columnKey]}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Holdings Table */}
                <div className=" p-2">
                  <h2 className="text-left text-2xl text-gray-800 font-bold mb-2 ml-4">
                    Holdings
                  </h2>
                  <div className="overflow-x-auto">
                    <Table
                      aria-label="Holdings table"
                      className="w-full min-h-[40vh] max-h-[40vh]"
                    >
                      <TableHeader columns={Holdingscolumns}>
                        {(Holdingscolumns) => (
                          <TableColumn
                            key={Holdingscolumns.key}
                            className="font-bold text-sm"
                          >
                            {Holdingscolumns.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={Holdingsrows}
                        emptyContent="No rows to display."
                      >
                        {(item) => (
                          <TableRow key={item.key}>
                            {(columnKey) => (
                              <TableCell>{item[columnKey]}</TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Portfolio;
