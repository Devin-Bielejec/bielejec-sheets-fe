import {
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/index.js";

import initialState from "./initialState";
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
        error: "",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
