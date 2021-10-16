import {
  UPDATE_ALL_QUESTIONS_INITIALIZE,
  UPDATE_ALL_QUESTIONS_FAIL,
  UPDATE_ALL_QUESTIONS_SUCCESS,
} from "../actions/index.js";

import initialState from "./initialState";

const updateAllQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_QUESTIONS_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case UPDATE_ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        allQuestions: action.payload.allQuestions,
        isFetching: false,
        error: "",
      };
    case UPDATE_ALL_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateAllQuestionsReducer;
