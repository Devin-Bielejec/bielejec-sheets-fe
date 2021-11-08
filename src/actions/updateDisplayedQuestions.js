import {
  UPDATE_DISPLAYED_QUESTIONS_INITIALIZE,
  //   UPDATE_DISPLAYED_QUESTIONS_FAIL,
  UPDATE_DISPLAYED_QUESTIONS_SUCCESS,
} from "./index";
// import { toast } from "react-toastify";
// import { axiosWithAuth, baseURL } from "../utils/index";

export const updateDisplayedQuestions = (data) => (dispatch) => {
  console.log("update displayed questions data", data);
  dispatch({ type: UPDATE_DISPLAYED_QUESTIONS_INITIALIZE });
  dispatch({
    type: UPDATE_DISPLAYED_QUESTIONS_SUCCESS,
    payload: {
      displayedQuestions: data,
    },
  });
};
