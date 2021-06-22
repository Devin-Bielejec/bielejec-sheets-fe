import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://bielejec-sheets-be.herokuapp.com";

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: baseURL,
    // headers: {
    //   Authorization: `Token ${token}`,
    // },
  });
};
