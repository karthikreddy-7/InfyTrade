export const generateMockPeriodData = (points) => {
    return {
      labels: Array.from({ length: points }, (_, i) => new Date(2022, 0, i + 1).toISOString()),
      stockData: generateStockData(100, 20, points)
    };
  };
  
  const generateStockData = (base, variance, points) => {
    let data = [];
    let opening = [];
    let highest = [];
    let lowest = [];
    let closing = [];
    let currentValue = base;
  
    for (let i = 0; i < points; i++) {
      let open = currentValue;
      let high = open + Math.random() * variance;
      let low = open - Math.random() * variance;
      let close = low + Math.random() * (high - low);
      currentValue = close;
  
      opening.push(open);
      highest.push(high);
      lowest.push(low);
      closing.push(close);
    }
  
    return {
      data: closing,
      opening,
      highest,
      lowest,
    };
  };
  
  export const mockData = {
    daily: generateMockPeriodData(24),
    weekly: generateMockPeriodData(7),
    monthly: generateMockPeriodData(30),
    yearly: generateMockPeriodData(365),
  };
  