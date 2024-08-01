import { combineReducers } from "redux";
import {
  ibmReducer,
  msftReducer,
  raceReducer,
  tslaReducer,
} from "./stockreducers";

// Initial state
const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  error: null,
};

const initialWidgetState = {
  widgets: [],
};

const initialDashboardState = {
  dashboards: [],
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

// Dashboard Reducer
const dashboardReducer = (state = initialDashboardState, action) => {
  switch (action.type) {
    case "SET_DASHBOARD":
      return {
        ...state,
        dashboards: action.payload,
      };
    case "UPDATE_DASHBOARD":
      return {
        ...state,
        dashboards: state.dashboards.map((dashboard) =>
          dashboard.id === action.payload.id ? action.payload : dashboard
        ),
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  widgets: widgetReducer,
  dashboards: dashboardReducer,
  ibm: ibmReducer,
  tsla: tslaReducer,
  msft: msftReducer,
  race: raceReducer,
});

export default rootReducer;
