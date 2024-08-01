// News.js
import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const [newsItems, setNewsItems] = useState([
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
  ]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setNewsItems((prevItems) => {
          const [first, ...rest] = prevItems;
          return [...rest, first];
        });
        setAnimate(false);
      }, 1500); // match this with CSS animation duration
    }, 3000); // total time between animations (fade-out + delay + fade-in)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow p-1 pt-3 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-2">Stock Market News</h2>
        <button className="text-blue-700 text-xs font-bold mr-3">
          See All
        </button>
      </div>
      <div className="space-y-4 pb-2">
        {newsItems.map((news, index) => (
          <div
            key={index}
            className={`bg-gray-200 p-3 rounded-lg ${
              index === 0 && animate ? "animate-fade-out" : ""
            } ${
              index > 0 && index < newsItems.length && animate
                ? "animate-fade-in"
                : ""
            }`}
          >
            <h3 className="font-semibold text-md mb-1">{news.title}</h3>
            <p className="text-sm text-gray-700">{news.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
