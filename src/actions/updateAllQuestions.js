import {
  UPDATE_ALL_QUESTIONS_INITIALIZE,
  UPDATE_ALL_QUESTIONS_FAIL,
  UPDATE_ALL_QUESTIONS_SUCCESS,
} from "./index";
// import { toast } from "react-toastify";
import { axiosWithAuth, baseURL } from "../utils/index";

export const updateAllQuestions = (data) => (dispatch) => {
  dispatch({ type: UPDATE_ALL_QUESTIONS_INITIALIZE });

  //   const token = sessionStorage.getItem("token");
  //   const url = token
  //     ? "https://bestplacesbe-test.herokuapp.com/city/spec-ds"
  //     : "https://bestplacesbe-test.herokuapp.com/city/ds";
  //   console.log(url);
  console.log("update all questions");
  const url = `${baseURL}/questions`;
  return axiosWithAuth()
    .get(url)
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_ALL_QUESTIONS_SUCCESS,
        payload: {
          allQuestions: res.data,
        },
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_ALL_QUESTIONS_FAIL,
        payload: { err, message: err.message },
      });
      //   toast.error(err.message);
      return false;
    });
};
