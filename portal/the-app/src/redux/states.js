const initState = {
  account: "",
  pk: "",
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
    default:
      return state;
  }
};

export default stateReducer;
