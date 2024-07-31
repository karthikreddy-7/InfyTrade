import React from 'react';

const StockChartGenerator = ({ selectedStock }) => {
  return (
    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
      {selectedStock ? <div>Display chart for {selectedStock.symbol}</div> : "Chart"}
    </div>
  );
};

export default StockChartGenerator;
