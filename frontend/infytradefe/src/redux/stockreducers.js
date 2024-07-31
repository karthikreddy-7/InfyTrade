const initialState = {};

const ibmReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IBM":
      return { ...action.payload };
    case "UPDATE_IBM":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const tslaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TSLA":
      return { ...action.payload };
    case "UPDATE_TSLA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const msftReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MSFT":
      return { ...action.payload };
    case "UPDATE_MSFT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RACE":
      return { ...action.payload };
    case "UPDATE_RACE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { raceReducer, msftReducer, tslaReducer, ibmReducer };
