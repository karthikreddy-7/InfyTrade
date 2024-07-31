// News.js
import React from 'react';

const News = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-2">Stock Market News</h2>
        <button className="text-blue-500">See All</button>
      </div>
      <div className="space-y-4">
        {[
          {
            title: "Market Hits New High",
            description:
              "The stock market reached a new high today driven by tech stocks.",
          },
          {
            title: "Federal Reserve Interest Rate Decision",
            description:
              "The Federal Reserve announces its decision on interest rates.",
          },
          {
            title: "Tech Stocks Surge",
            description:
              "Tech stocks are surging following positive earnings reports from major companies.",
          },
        ].map((news, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
            <h3 className="font-semibold text-md mb-1">{news.title}</h3>
            <p className="text-sm text-gray-700">{news.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
