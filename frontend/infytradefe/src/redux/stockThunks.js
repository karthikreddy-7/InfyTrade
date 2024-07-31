// actions/stockThunks.js
import {
  setIbmStock,
  updateIbmStock,
  setTslaStock,
  updateTslaStock,
  setMsftStock,
  updateMsftStock,
  setRaceStock,
  updateRaceStock,
} from "./action";
import { fetchStockByNameRedux, fluctuateBasePrice } from "../api/stocks";

export const initializeIbmStockPricesThunk = () => async (dispatch) => {
  try {
    const prices = await fetchStockByNameRedux("IBM");
    const initialPrice = prices[prices.length - 1];
    const bid = (parseFloat(initialPrice) * 1.02).toFixed(2);
    const ask = (parseFloat(initialPrice) * 0.98).toFixed(2);
    console.log({ prices, bid, ask, currentPrice: initialPrice });
    dispatch(setIbmStock({ symbol: "IBM", prices, bid, ask, currentPrice: initialPrice }));
  } catch (error) {
    console.error("Failed to initialize IBM stock prices:", error);
  }
};

export const initializeTslaStockPricesThunk = () => async (dispatch) => {
  try {
    const prices = await fetchStockByNameRedux("TSLA");
    const initialPrice = prices[prices.length - 1];
    const bid = (parseFloat(initialPrice) * 1.02).toFixed(2);
    const ask = (parseFloat(initialPrice) * 0.98).toFixed(2);
    dispatch(setTslaStock({ symbol: "TSLA", prices, bid, ask, currentPrice: initialPrice }));
  } catch (error) {
    console.error("Failed to initialize TSLA stock prices:", error);
  }
};

export const initializeMsftStockPricesThunk = () => async (dispatch) => {
  try {
    const prices = await fetchStockByNameRedux("MSFT");
    const initialPrice = prices[prices.length - 1];
    const bid = (parseFloat(initialPrice) * 1.02).toFixed(2);
    const ask = (parseFloat(initialPrice) * 0.98).toFixed(2);
    dispatch(setMsftStock({ symbol: "MSFT", prices, bid, ask, currentPrice: initialPrice }));
  } catch (error) {
    console.error("Failed to initialize MSFT stock prices:", error);
  }
};

export const initializeRaceStockPricesThunk = () => async (dispatch) => {
  try {
    const prices = await fetchStockByNameRedux("RACE");
    const initialPrice = prices[prices.length - 1];
    const bid = (parseFloat(initialPrice) * 1.02).toFixed(2);
    const ask = (parseFloat(initialPrice) * 0.98).toFixed(2);
    dispatch(setRaceStock({ symbol: "RACE", prices, bid, ask, currentPrice: initialPrice }));
  } catch (error) {
    console.error("Failed to initialize RACE stock prices:", error);
  }
};

export const updateIbmStockPriceThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentPrices = state.ibm?.prices || [];

  if (!Array.isArray(currentPrices) || currentPrices.length === 0) {
    console.log("IBM stock prices not initialized yet.");
    return; // Skip update if prices array is not available or empty
  }

  const newPrice = fluctuateBasePrice(
    currentPrices[currentPrices.length - 1],
    2
  ).toFixed(3);

  const bid = (parseFloat(newPrice) - parseFloat(newPrice) * 0.02).toFixed(2);
  const ask = (parseFloat(newPrice) + parseFloat(newPrice) * 0.02).toFixed(2);

  // console.log({ currentPrices, bid, ask, currentPrice: newPrice });

  dispatch(
    updateIbmStock({
      symbol: "IBM",
      prices: [...currentPrices, newPrice],
      bid,
      ask,
      currentPrice: newPrice,
    })
  );
};

export const updateTslaStockPriceThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentPrices = state.tsla?.prices || [];

  if (!Array.isArray(currentPrices) || currentPrices.length === 0) {
    console.log("TSLA stock prices not initialized yet.");
    return; // Skip update if prices array is not available or empty
  }

  const newPrice = fluctuateBasePrice(
    currentPrices[currentPrices.length - 1],
    2
  ).toFixed(3);

  const bid = (parseFloat(newPrice) - parseFloat(newPrice) * 0.02).toFixed(2);
  const ask = (parseFloat(newPrice) + parseFloat(newPrice) * 0.02).toFixed(2);

  dispatch(
    updateTslaStock({
      symbol: "TSLA",
      prices: [...currentPrices, newPrice],
      bid,
      ask,
      currentPrice: newPrice,
    })
  );
};

export const updateMsftStockPriceThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentPrices = state.msft?.prices || [];

  if (!Array.isArray(currentPrices) || currentPrices.length === 0) {
    console.log("MSFT stock prices not initialized yet.");
    return; // Skip update if prices array is not available or empty
  }

  const newPrice = fluctuateBasePrice(
    currentPrices[currentPrices.length - 1],
    2
  ).toFixed(3);

  const bid = (parseFloat(newPrice) - parseFloat(newPrice) * 0.02).toFixed(2);
  const ask = (parseFloat(newPrice) + parseFloat(newPrice) * 0.02).toFixed(2);

  dispatch(
    updateMsftStock({
      symbol: "MSFT",
      prices: [...currentPrices, newPrice],
      bid,
      ask,
      currentPrice: newPrice,
    })
  );
};

export const updateRaceStockPriceThunk = () => (dispatch, getState) => {
  const state = getState();
  const currentPrices = state.race?.prices || [];

  if (!Array.isArray(currentPrices) || currentPrices.length === 0) {
    console.log("RACE stock prices not initialized yet.");
    return; // Skip update if prices array is not available or empty
  }

  const newPrice = fluctuateBasePrice(
    currentPrices[currentPrices.length - 1],
    2
  ).toFixed(3);

  const bid = (parseFloat(newPrice) - parseFloat(newPrice) * 0.02).toFixed(2);
  const ask = (parseFloat(newPrice) + parseFloat(newPrice) * 0.02).toFixed(2);

  dispatch(
    updateRaceStock({
      symbol: "RACE",
      prices: [...currentPrices, newPrice],
      bid,
      ask,
      currentPrice: newPrice,
    })
  );
};
