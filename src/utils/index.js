import axios from "axios";

// export const baseURL = "https://lambda-mud-test.herokuapp.com";
export const baseURL = "http://localhost:4000";

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Token ${token}`
    }
  });
};
