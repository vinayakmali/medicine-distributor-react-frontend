import { createStore } from "redux";
let isLoggedIn = false;
let userD = [];
if (sessionStorage.getItem("isLoggedIn")) isLoggedIn = true;
if (sessionStorage.getItem("userDetails"))
  userD = JSON.parse(sessionStorage.getItem("userDetails"));
const initialState = {
  isLoggedIn: isLoggedIn,
  userDetails: userD,
  latlon: {},
  labels: {},
};
const stateReducer = (state = initialState, action) => {
  if (action.type === "loginSuccess") {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userDetails", JSON.stringify(action.userDet));
    return {
      isLoggedIn: true,
      userDetails: { ...action.userDet },
    };
  }
  if (action.type === "latlon") {
    return {
      isLoggedIn: state.isLoggedIn,
      userDetails: state.userDetails,
      latlon: action.data,
      labels: action.data.labels,
    };
  }
  return state;
};
const store = createStore(stateReducer);
export default store;
