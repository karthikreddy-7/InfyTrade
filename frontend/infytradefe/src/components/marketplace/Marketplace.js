import React, { useState } from 'react';
import BuyModal from '../orderModel/BuyModal';
import SellModal from '../orderModel/SellModal';
const Marketplace = () => {

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleBuyClick = (company) => {
    setSelectedCompany(company);
    setIsBuyModalOpen(true);
  };

  const handleSellClick = (company) => {
    setSelectedCompany(company);
    setIsSellModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <main className="flex-1 p-5 overflow-y-auto">
        <header className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Stock"
            className="p-2 border rounded w-1/2"
          />
          <img
            src="path-to-profile-picture.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </header>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Stocks</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {["Adobe", "Apple", "Amazon", "Microsoft", "Google"].map((stock) => (
              <div key={stock} className="bg-white p-5 rounded-lg shadow min-w-max">
                <span>{stock}</span>
                <div>Market Price: +201.01</div>
                <div>Bid Price: +$195.01</div>
                <div>Ask Price: +$210.01</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-5 rounded-lg shadow col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">Amazon Chart</h2>
              <button className="text-blue-500">See All</button>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 col-span-1">
            <div className="bg-white p-5 rounded-lg shadow mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2">Top Gainers</h2>
                <button className="text-blue-500">See All</button>
              </div>
              {["Apple", "Microsoft"].map((stock) => (
                <div key={stock} className="mb-2 flex justify-between">
                  <span>{stock}</span>
                  <span>$201.01</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-2">Top Losers</h2>
                <button className="text-blue-500">See All</button>
              </div>
              {["Amazon", "Google"].map((stock) => (
                <div key={stock} className="mb-2 flex justify-between">
                  <span>{stock}</span>
                  <span>$201.01</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 mb-2">
        <h2 className="text-lg font-semibold">Market Trend</h2>
        <h2 className="text-lg font-semibold">Bid Price</h2>
        <h2 className="text-lg font-semibold">Ask Price</h2>
        <h2 className="text-lg font-semibold">Place Order</h2>
        <h2 className="text-lg font-semibold">Current Price</h2>
        <button className="text-blue-500 col-span-6 text-right">See All</button>
      </div>
      {["Apple Inc", "Amazon"].map((company) => (
        <div key={company} className="grid grid-cols-6 gap-4 mb-2 items-center">
          <span>{company}</span>
          <span>$196</span>
          <span>$210</span>
          <span className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleBuyClick(company)}
            >
              Buy
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleSellClick(company)}
            >
              Sell
            </button>
          </span>
          <span>$201.01</span>
        </div>
      ))}
      {isBuyModalOpen && <BuyModal company={selectedCompany} onClose={() => setIsBuyModalOpen(false)} />}
      {isSellModalOpen && <SellModal company={selectedCompany} onClose={() => setIsSellModalOpen(false)} />}
    </div>

      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-white p-5 shadow-lg overflow-y-auto flex flex-col">
        <div className="bg-white p-5 rounded-lg shadow mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold mb-2">Stock Market News</h2>
            <button className="text-blue-500">See All</button>
          </div>
          <div className="space-y-4">
            {[
              { title: "Market Hits New High", description: "The stock market reached a new high today driven by tech stocks." },
              { title: "Federal Reserve Interest Rate Decision", description: "The Federal Reserve announces its decision on interest rates." },
              { title: "Tech Stocks Surge", description: "Tech stocks are surging following positive earnings reports from major companies." },
            ].map((news, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                <h3 className="font-semibold text-md mb-1">{news.title}</h3>
                <p className="text-sm text-gray-700">{news.description}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};


export default Marketplace;
