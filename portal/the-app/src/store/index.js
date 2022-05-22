import { createStore } from "redux";
import stateReducer from "../redux/states";

const store = createStore(stateReducer);

export default store;

export const setAccount = (account) => {
  return {
    type: "setAccount",
    payload: account,
  };
};

export const setPk = (pk) => {
  return {
    type: "setPk",
    payload: pk,
  };
};
