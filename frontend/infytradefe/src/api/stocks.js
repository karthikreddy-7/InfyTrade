const API_URL = "https://infytrade-pms.onrender.com";

// Function to fetch stock data by name
export const fetchStockByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/stocks/search?name=${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const prices = data.map((stock) => parseFloat(stock.price));
    const avgPrice = (
      prices.reduce((a, b) => a + b, 0) / prices.length
    ).toFixed(2);
    return { symbol: data[0].symbol, price: avgPrice };
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    throw error; // This can be handled in the calling code
  }
};

// Function to get top gainers and losers
export const getGainersAndLosers = (stocks) => {
  const sortedStocks = stocks.sort((a, b) => b.price - a.price);
  const gainers = sortedStocks.slice(0, 5);
  const losers = sortedStocks.slice(-5).reverse();
  return { gainers, losers };
};

// Function to dynamically adjust market price
export const adjustMarketPrice = (price) => {
  const change = (Math.random() * 2 - 1).toFixed(2); // Change between -1 and 1
  const newPrice = (parseFloat(price) + parseFloat(change)).toFixed(2);
  return { newPrice, change };
};

// Function to fluctate baseprice
export const fluctuateBasePrice = (price, percentage) => {
  const fluctuation = Math.random() * (percentage * 2) - percentage;
  return parseFloat(price) + (parseFloat(price) * fluctuation) / 100;
};

export const fetchStockByNameRedux = async (name) => {
  try {
    const response = await fetch(`${API_URL}/stocks/search?name=${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const prices = data.map((stock) => parseFloat(stock.price));
    return prices;
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
    throw error;
  }
};
