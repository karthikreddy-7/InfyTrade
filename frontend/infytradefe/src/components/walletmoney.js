import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../utilities/getRandomTimeout";

function Walletmoney() {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  const data = [
    {
      id: 1,
      name: "Cy Ganderton",
      job: "Quality Control Specialist",
      favoriteColor: "Blue",
    },
    {
      id: 2,
      name: "Hart Hagerty",
      job: "Desktop Support Technician",
      favoriteColor: "Purple",
    },
    { id: 3, name: "Brice Swyre", job: "Tax Accountant", favoriteColor: "Red" },
    // Add more data objects as needed
  ];

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
          <div className=" flex flex-row">
            <div className="flex flex-col justify-center items-start h-screen">
              <div className="stats bg-primary text-primary-content justify-center items-center ml-8">
                <div className="stat">
                  <div className="stat-title text-white">Account balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm btn-success text-white">
                      Add funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title text-white">Current balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm m-2">Withdrawal</button>
                    <button className="btn btn-sm m-2">Deposit</button>
                  </div>
                </div>
              </div>
              <div className="stats bg-primary mt-4 text-primary-content justify-center items-center ml-8">
                <div className="stat">
                  <div className="stat-title text-white">Account balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm btn-success text-white">
                      Add funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title text-white">Current balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm m-2">Withdrawal</button>
                    <button className="btn btn-sm m-2">Deposit</button>
                  </div>
                </div>
              </div>
              <div className="stats bg-primary mt-4 text-primary-content justify-center items-center ml-8">
                <div className="stat">
                  <div className="stat-title text-white">Account balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm btn-success text-white">
                      Add funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title text-white">Current balance</div>
                  <div className="stat-value text-white">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm m-2">Withdrawal</button>
                    <button className="btn btn-sm m-2">Deposit</button>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className=" h-screen justify-center items-center p-6">
              <div className="m-2 text-2xl font-bold p-4">Wallet Summary</div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id} className="hover">
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.job}</td>
                        <td>{item.favoriteColor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Walletmoney;
