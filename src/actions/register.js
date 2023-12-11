import { axiosWithAuth } from "../utils/index.js";
import { REGISTER_INITIALIZE, REGISTER_SUCCESS, REGISTER_FAIL } from "./index";

export const registerUser = (userData) => (dispatch) => {
  dispatch({ type: REGISTER_INITIALIZE });
  return axiosWithAuth()
    .post(`/register`, userData)
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: { err, message: err.message },
      });
      // toast.error(err.message);
      return false;
    });
};
