import {
  REGISTER_FAIL,
  REGISTER_INITIALIZE,
  REGISTER_SUCCESS,
} from "../actions/index.js";

import initialState from "./initialState.js";
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: "",
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
