import {
  UPDATE_DOCUMENT_QUESTIONS_INITIALIZE,
  UPDATE_DOCUMENT_QUESTIONS_SUCCESS,
  UPDATE_DOCUMENT_QUESTIONS_FAIL,
} from "./index";
// import { toast } from "react-toastify";
// import { axiosWithAuth, baseURL } from "../utils/index";

export const updateDocumentQuestions = (data) => (dispatch) => {
  console.log("here");
  dispatch({ type: UPDATE_DOCUMENT_QUESTIONS_INITIALIZE });

  //   const token = sessionStorage.getItem("token");
  //   const url = token
  //     ? "https://bestplacesbe-test.herokuapp.com/city/spec-ds"
  //     : "https://bestplacesbe-test.herokuapp.com/city/ds";
  //   console.log(url);
  // const url = `${baseURL}/questions`;
  dispatch({
    type: UPDATE_DOCUMENT_QUESTIONS_SUCCESS,
    payload: {
      questions: data,
    },
  });
  return true;
};
