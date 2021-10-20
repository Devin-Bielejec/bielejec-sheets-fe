import {
  UPDATE_DOCUMENT_QUESTIONS_INITIALIZE,
  UPDATE_DOCUMENT_QUESTIONS_SUCCESS,
  UPDATE_DOCUMENT_QUESTIONS_FAIL,
} from "../actions/index.js";

import initialState from "./initialState";

const updateDocumentQuestions = (state = initialState, action) => {
  console.log("update document questions??");
  switch (action.type) {
    case UPDATE_DOCUMENT_QUESTIONS_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case UPDATE_DOCUMENT_QUESTIONS_SUCCESS:
      return {
        ...state,
        document: {
          ...state.document,
          questions: [...action.payload.questions],
        },
        isFetching: false,
        error: "",
      };
    case UPDATE_DOCUMENT_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateDocumentQuestions;
