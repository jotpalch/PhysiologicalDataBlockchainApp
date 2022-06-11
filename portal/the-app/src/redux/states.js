const initState = {
  account: "",
  pk: "",
  providers: [],
};

const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case "setAccount":
      return {
        ...state,
        account: action.payload,
      };
    case "setPk":
      return {
        ...state,
        pk: action.payload,
      };
    case "setProvider":
      return {
        ...state,
        providers: action.payload,
      };
    default:
      return state;
  }
};

export default stateReducer;
