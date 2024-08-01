import axios from "axios";

// Auth Actions
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

// Widget Actions
export const addWidget = (widget) => ({
  type: "ADD_WIDGET",
  payload: widget,
});

export const removeWidget = (widgetId) => ({
  type: "REMOVE_WIDGET",
  payload: widgetId,
});

// Async Actions (example)
export const fetchUserWidgets = () => async (dispatch) => {
  const response = await axios.get("/api/user/widgets");
  response.data.forEach((widget) => {
    dispatch(addWidget(widget));
  });
};

// actions/stockActions.js

// IBM Actions
export const setIbmStock = (stock) => ({
  type: "SET_IBM",
  payload: stock,
});

export const updateIbmStock = (stock) => ({
  type: "UPDATE_IBM",
  payload: stock,
});

// TSLA Actions
export const setTslaStock = (stock) => ({
  type: "SET_TSLA",
  payload: stock,
});

export const updateTslaStock = (stock) => ({
  type: "UPDATE_TSLA",
  payload: stock,
});

// MSFT Actions
export const setMsftStock = (stock) => ({
  type: "SET_MSFT",
  payload: stock,
});

export const updateMsftStock = (stock) => ({
  type: "UPDATE_MSFT",
  payload: stock,
});

// RACE Actions
export const setRaceStock = (stock) => ({
  type: "SET_RACE",
  payload: stock,
});

export const updateRaceStock = (stock) => ({
  type: "UPDATE_RACE",
  payload: stock,
});

// Dashboard Actions
export const setDashboards = (dashboard) => ({
  type: "SET_DASHBOARD",
  payload: dashboard,
});

export const updateDashboard = (dashboard) => ({
  type: "UPDATE_DASHBOARD",
  payload: dashboard,
});
