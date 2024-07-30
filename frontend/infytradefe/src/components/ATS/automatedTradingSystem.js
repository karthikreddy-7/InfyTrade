import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";
import { CircularProgress } from "@nextui-org/react";

function AutomatedTradingSystem() {
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
          <div>AutomatedTradingSystem</div>
        </>
      )}
    </>
  );
}

export default AutomatedTradingSystem;
