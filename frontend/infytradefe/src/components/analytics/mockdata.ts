type StockData = {
  data: number[];
  opening: number;
  highest: number;
  lowest: number;
};

type PeriodData = {
  labels: string[];
  stockData: {
    IBM: StockData;
    MSFT: StockData;
    TSLA: StockData;
    RACE: StockData;
  };
};

export const mockData: {
  daily: PeriodData;
  weekly: PeriodData;
  monthly: PeriodData;
  yearly: PeriodData;
} = {
  daily: generateMockPeriodData(24, ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']),
  weekly: generateMockPeriodData(7, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  monthly: generateMockPeriodData(30, Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)),
  yearly: generateMockPeriodData(365, Array.from({ length: 365 }, (_, i) => `Day ${i + 1}`)),
};

function generateMockPeriodData(points: number, labels: string[]): PeriodData {
  return {
    labels,
    stockData: {
      IBM: generateStockData(191, 30, points),
      MSFT: generateStockData(460, 20, points),
      TSLA: generateStockData(220, 15, points),
      RACE: generateStockData(400, 25, points),
    }
  };
}

function generateStockData(base: number, variance: number, points: number): StockData {
  let data: number[] = [];
  let currentValue = base;
  let highest = base;
  let lowest = base;
  const minValue = base * 0.2;

  for (let i = 0; i < points; i++) {
    let change = Math.random() * variance - (variance / 2);
    currentValue = Math.max(currentValue + change, minValue);
    data.push(currentValue);
    if (currentValue > highest) highest = currentValue;
    if (currentValue < lowest) lowest = currentValue;
  }

  return {
    data,
    opening: data[0],
    highest,
    lowest
  };
}
