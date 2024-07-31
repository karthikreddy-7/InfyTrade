import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@nextui-org/react';
import { getRandomTimeout } from '../../utilities/getRandomTimeout';
import MonthlyRetail from './MonthlyRetail';
import NumberOfTrades from './NumberOfTrades';
import Technicals from './Technicals';
import Purchases from './Purchases';
import TradesByStrategies from './TradesByStrategies';
import ProfitLossCumulative from './ProfitLossCumulative';
import Watchlist from './Watchlist';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div style={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <div style={styles.dashboard}>
          <div style={styles.mainContent}>
            <MonthlyRetail />
            <div style={styles.row}>
              <NumberOfTrades />
              <Technicals />
              <Purchases />
            </div>
          </div>
          <div style={styles.sideContent}>
            <TradesByStrategies />
            <ProfitLossCumulative />
            <Watchlist />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  loadingContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboard: {
    display: 'flex',
    padding: '20px',
    gap: '20px',
  },
  mainContent: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sideContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'flex',
    gap: '20px',
  },
};

export default Dashboard;
