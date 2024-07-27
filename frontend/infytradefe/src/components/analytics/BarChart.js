import React from 'react';
import { BarChart as TremorBarChart } from '@tremor/react';
import { mockData } from './mockdata';

const BarChart = ({ selectedStock }) => {
  const data = mockData[selectedStock].labels.map((label, index) => ({
    date: label,
    Price: mockData[selectedStock].datasets[0].data[index],
  }));

  return (
    <TremorBarChart
      className="mt-4 h-72"
      data={data}
      index="date"
      categories={['Price']}
      colors={['blue']}
      yAxisWidth={30}
    />
  );
};

export default BarChart;
