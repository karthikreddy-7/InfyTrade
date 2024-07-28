export const mockData = {
  daily: {
    labels: [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ],
    datasets: {
      IBM: generateDataset(191, 25, 24),
      MSFT: generateDataset(460, 30, 24),
      TSLA: generateDataset(220, 20, 24),
      RACE: generateDataset(400, 15, 24),
    },
  },
  weekly: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: {
      IBM: generateDataset(191, 25, 7),
      MSFT: generateDataset(460, 30, 7),
      TSLA: generateDataset(220, 20, 7),
      RACE: generateDataset(400, 15, 7),
    },
  },
  monthly: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: {
      IBM: generateDataset(191, 25, 30),
      MSFT: generateDataset(460, 30, 30),
      TSLA: generateDataset(220, 20, 30),
      RACE: generateDataset(400, 15, 30),
    },
  },
  yearly: {
    labels: Array.from({ length: 365 }, (_, i) => `Day ${i + 1}`),
    datasets: {
      IBM: generateDataset(191, 25, 365),
      MSFT: generateDataset(460, 30, 365),
      TSLA: generateDataset(220, 20, 365),
      RACE: generateDataset(400, 15, 365),
    },
  }
};

function generateDataset(base: number, variance: number, points: number) {
  const data = generateSmoothData(base, variance, points);
  const opening = data[0];
  const highest = Math.max(...data);
  const lowest = Math.min(...data);

  return {
    data,
    opening,
    highest,
    lowest
  };
}

function generateSmoothData(base: number, variance: number, points: number) {
  let data = [];
  let currentValue = base;
  const minValue = base * 0.2;

  for (let i = 0; i < points; i++) {
    let change = Math.random() * variance - (variance / 2);
    currentValue = Math.max(currentValue + change, minValue);
    data.push(currentValue);
  }

  return data;
}
