import React, { useState } from 'react';

const SellModal = ({ company, marketPrice, onClose }) => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const handleQuantityChange = (event) => setQuantity(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleTargetPriceChange = (event) => setTargetPrice(event.target.value);
  const handleStopLossChange = (event) => setStopLoss(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sell action here
    console.log(`Selling ${quantity} of ${company} at ${price}`);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sell {company}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Current Stock Name:</label>
              <span className="block bg-gray-100 text-gray-800 p-3 rounded">{company}</span>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Market Price:</label>
              <span className="block bg-gray-100 text-gray-800 p-3 rounded">${marketPrice}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="border-2 border-red-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Price:</label>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                className="border-2 border-red-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Target Price:</label>
              <input
                type="number"
                value={targetPrice}
                onChange={handleTargetPriceChange}
                className="border-2 border-red-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Stop Loss:</label>
              <input
                type="number"
                value={stopLoss}
                onChange={handleStopLossChange}
                className="border-2 border-red-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-red-600 transition"
            >
              Sell
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellModal;
