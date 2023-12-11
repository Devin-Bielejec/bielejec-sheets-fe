import { axiosWithAuth } from "../utils/index.js";
import { LOGIN_INITIALIZE, LOGIN_SUCCESS, LOGIN_FAIL } from "./index";

export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_INITIALIZE });

  return axiosWithAuth()
    .post(`/login`, credentials)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      dispatch({
        type: LOGIN_SUCCESS,
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: { err, message: err.message },
      });
      //   toast.error(err.message);
      return false;
    });
};
