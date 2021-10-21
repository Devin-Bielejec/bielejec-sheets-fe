import {
  CREATE_DOCUMENT_INITIALIZE,
  CREATE_DOCUMENT_FAIL,
  CREATE_DOCUMENT_SUCCESS,
} from "./index";
// import { toast } from "react-toastify";
import { axiosWithAuth, baseURL } from "../utils/index";

export const createDocument = (data) => (dispatch) => {
  dispatch({ type: CREATE_DOCUMENT_INITIALIZE });

  //   const token = sessionStorage.getItem("token");
  //   const url = token
  //     ? "https://bestplacesbe-test.herokuapp.com/city/spec-ds"
  //     : "https://bestplacesbe-test.herokuapp.com/city/ds";
  //   console.log(url);
  const url = `${baseURL}/createDocument`;
  return axiosWithAuth()
    .post(url, { data })
    .then((res) => {
      console.log("ACTION", res, data);
      console.log(baseURL);

      dispatch({
        type: CREATE_DOCUMENT_SUCCESS,
        payload: {
          downloadLink: `${baseURL}/getFile/${data.username}/${data.document.nameOfDoc}`,
          downloadName: data.document.nameOfDoc,
        },
      });
      return true;
    })
    .catch((err) => {
      dispatch({
        type: CREATE_DOCUMENT_FAIL,
        payload: { err, message: err.message },
      });
      //   toast.error(err.message);
      return false;
    });
};
