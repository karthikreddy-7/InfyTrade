// mockdata.ts
export const mockData = {
  daily: {
    labels: [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ],
    datasets: {
      IBM: { data: generateData(150, 5) },
      MSFT: { data: generateData(250, 10) },
      TSLA: { data: generateData(600, 20) },
      RACE: { data: generateData(400, 15) },
    },
  },
  weekly: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: {
      IBM: { data: generateData(150, 5) },
      MSFT: { data: generateData(250, 10) },
      TSLA: { data: generateData(600, 20) },
      RACE: { data: generateData(400, 15) },
    },
  },
  monthly: {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: {
      IBM: { data: generateData(150, 5) },
      MSFT: { data: generateData(250, 10) },
      TSLA: { data: generateData(600, 20) },
      RACE: { data: generateData(400, 15) },
    },
  },
};

function generateData(base: number, variance: number): number[] {
  return Array.from({ length: 30 }, () => base + Math.floor(Math.random() * variance * 2) - variance);
}
