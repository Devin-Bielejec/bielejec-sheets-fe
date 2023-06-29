import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://bielejec-sheets-be.herokuapp.com";

export const baseURLStatic =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://bielejec-sheets-be.herokuapp.com/";

//Makes axios call and send token if existing
export const axiosWithAuth = () => {
  // const token = localStorage.getItem("token");

  return axios.create({
    baseURL: baseURL,
    // headers: {
    //   Authorization: `Token ${token}`,
    // },
  });
};

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
