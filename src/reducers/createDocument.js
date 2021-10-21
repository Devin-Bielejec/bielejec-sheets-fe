import {
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_INITIALIZE,
  CREATE_DOCUMENT_FAIL,
} from "../actions/index.js";

import initialState from "./initialState";
const createDocumentReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case CREATE_DOCUMENT_INITIALIZE:
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case CREATE_DOCUMENT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        document: {
          ...state.document,
          downloadName: action.payload.downloadName,
          downloadLink: action.payload.downloadLink,
        },
        isFetching: false,
        error: "",
      };
    case CREATE_DOCUMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createDocumentReducer;
