import { combineReducers } from "redux";

// Initial state
const initialAuthState = {
  isLoggedIn: false,
  user: null,
};

const initialWidgetState = {
  widgets: [],
};

// Auth Reducer
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
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
