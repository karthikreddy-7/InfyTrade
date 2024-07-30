import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../utilities/getRandomTimeout";

function Walletmoney() {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      //setloading should be removed
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
        <>
          <div className="m-8">
            <h1 className="font-bold text-2xl">You cards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4  bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Profit/Loss
                </h3>
                <p className="text-lg">$5000</p>
              </div>
              <div className="p-4 bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Total Balance
                </h3>
                <p className="text-lg">$25000</p>
              </div>
              <div className="p-4  bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Profit/Loss
                </h3>
                <p className="text-lg">$5000</p>
              </div>
              <div className="p-4  bg-white shadow-lg rounded-lg m-4">
                <h3 h4 className="font-semibold mb-2">
                  Profit/Loss
                </h3>
                <p className="text-lg">$5000</p>
              </div>
            </div>
            <div className="stats bg-primary text-primary-content">
              <div className="stat">
                <div className="stat-title">Account balance</div>
                <div className="stat-value">$89,400</div>
                <div className="stat-actions">
                  <button className="btn btn-sm btn-success">Add funds</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Current balance</div>
                <div className="stat-value">$89,400</div>
                <div className="stat-actions">
                  <button className="btn btn-sm">Withdrawal</button>
                  <button className="btn btn-sm">Deposit</button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
}

export default Walletmoney;
