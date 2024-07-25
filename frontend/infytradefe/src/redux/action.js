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
