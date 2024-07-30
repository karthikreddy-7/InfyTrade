import React, { useState, useEffect } from "react";
import { Card } from "@tremor/react";
import { useSelector } from "react-redux";
import {
  fetchPortfolioData,
  fetchUserHoldings,
} from "../../api/portfolioHoldings";

function Portfolio() {
  const user = useSelector((state) => state.auth.user);
  const [portfolioData, setPortfolioData] = useState([]);
  const [holdingsData, setHoldingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let portfolio = user.portfolios || [];
        let holdings = user.holdings || [];

        if (portfolio.length === 0) {
          const portfolioResponse = await fetchPortfolioData(user.id);
          console.log(portfolioResponse);
          portfolio = portfolioResponse || [];
        }

        if (holdings.length === 0) {
          const holdingsResponse = await fetchUserHoldings(user.id);
          console.log(holdingsResponse);
          holdings = holdingsResponse || [];
        }

        setPortfolioData(portfolio);
        setHoldingsData(holdings);
        console.log(portfolio);
        console.log(holdings);
        if (portfolio.length === 0 && holdings.length === 0) {
          setMessage(
            "No history / No portfolio. Please navigate to the marketplace section to buy/sell portfolios."
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <>
          <h2 className="text-center text-xl font-semibold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {portfolioData.map((item) => (
              <Card key={item.id} className="mx-auto max-w-xs rounded-md">
                <div className="p-4">
                  <p className="text-center font-bold">{item.stock}</p>
                  <p className="text-center text-slate-400">
                    {item.type} - {item.quantity} @ ${item.price}
                  </p>
                  <p className="text-center text-slate-400">
                    Date: {new Date(item.transactionDate).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-center text-xl font-semibold mb-4">Holdings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {holdingsData.map((item) => (
              <Card key={item.id} className="mx-auto max-w-xs rounded-md">
                <div className="p-4">
                  <p className="text-center font-bold">{item.stock}</p>
                  <p className="text-center text-slate-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-center text-slate-400">
                    Average Price: ${item.averagePrice}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>

  );
}

export default Portfolio;
