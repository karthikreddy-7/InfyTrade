import { combineReducers } from "redux";

// Initial state
const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  error: null,
};

const initialWidgetState = {
  widgets: [],
};

// Auth Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

// Widget Reducer
const widgetReducer = (state = initialWidgetState, action) => {
  switch (action.type) {
    case "ADD_WIDGET":
      return {
        ...state,
        widgets: [...state.widgets, action.payload],
      };
    case "REMOVE_WIDGET":
      return {
        ...state,
        widgets: state.widgets.filter((widget) => widget.id !== action.payload),
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  widgets: widgetReducer,
});

export default rootReducer;
