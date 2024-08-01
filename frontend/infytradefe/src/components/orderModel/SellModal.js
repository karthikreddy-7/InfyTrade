import React, { useState } from "react";
import { createPortfolio } from "../../api/portfolioHoldings";

const SellModal = ({
  company,
  marketPrice,
  askPrice,
  userId,
  onClose,
  showAlert,
}) => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(askPrice); // Initialize price with askPrice
  const [loading, setLoading] = useState(false); // Add loading state

  const handleQuantityChange = (event) => setQuantity(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the request

    const portfolioData = {
      userId: userId,
      stock: company,
      type: "SELL",
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      transactionDate: new Date().toISOString(),
    };

    try {
      const response = await createPortfolio(portfolioData);
      console.log("Portfolio updated successfully:", response);
      showAlert("success", "Stock Sold Successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating portfolio:", error);
      showAlert("error", "Failed to sell stock.");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Sell {company}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">
                Current Stock Name:
              </label>
              <span className="block bg-gray-100 text-gray-800 p-3 rounded">
                {company}
              </span>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Market Price:</label>
              <span className="block bg-gray-100 text-gray-800 p-3 rounded">
                ${marketPrice}
              </span>
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
              <label className="block text-gray-600 mb-1">
                Price (Ask Price):
              </label>
              <span className="block bg-gray-100 text-gray-800 p-3 rounded">
                ${askPrice}
              </span>
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
              className={`flex btn items-center ${
                loading
                  ? "bg-gray-500 text-black cursor-not-allowed"
                  : "bg-red-500 text-black hover:bg-red-600"
              } px-4 py-2 rounded-lg font-medium shadow-sm transition`}
              disabled={loading} // Disable button while loading
            >
              {loading && (
                <span
                  className="loading loading-spinner spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {loading ? "Selling..." : "Sell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellModal;
