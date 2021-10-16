import {
  UPDATE_DISPLAYED_QUESTIONS_INITIALIZE,
  UPDATE_DISPLAYED_QUESTIONS_FAIL,
  UPDATE_DISPLAYED_QUESTIONS_SUCCESS,
} from "../actions/index.js";

import initialState from "./initialState";

const updateDisplayedQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DISPLAYED_QUESTIONS_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case UPDATE_DISPLAYED_QUESTIONS_SUCCESS:
      console.log(action.payload.displayedQuestions);
      return {
        ...state,
        displayedQuestions: action.payload.displayedQuestions,
        isFetching: false,
        error: "",
      };
    case UPDATE_DISPLAYED_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateDisplayedQuestionsReducer;
