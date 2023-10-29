import {
  UPDATE_DISPLAYED_QUESTIONS_INITIALIZE,
  //   UPDATE_DISPLAYED_QUESTIONS_FAIL,
  UPDATE_DISPLAYED_QUESTIONS_SUCCESS,
} from "./index";
// import { toast } from "react-toastify";
// import { axiosWithAuth, baseURL } from "../utils/index";
import { filterAndMapByDifficulty } from "../utils";

export const updateDisplayedQuestions = (data) => (dispatch) => {
  console.log("update displayed questions data", data);
  //Merging data to include questions by same difficulty, so we only show one card of each difficulty
  data = filterAndMapByDifficulty(data);

  dispatch({ type: UPDATE_DISPLAYED_QUESTIONS_INITIALIZE });
  dispatch({
    type: UPDATE_DISPLAYED_QUESTIONS_SUCCESS,
    payload: {
      displayedQuestions: data,
    },
  });
};
