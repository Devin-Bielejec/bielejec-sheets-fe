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

export function filterAndMapByDifficulty(array) {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    let cur = array[i];
    let temp = [];
    let fileNameHash = {};
    fileNameHash[cur.fileName] = 1;
    //get cur kwargs that aren't difficulty
    let kwargs = Object.keys(cur.kwargs).filter((i) => i != "difficulty");
    temp = [
      cur,
      ...array.filter((i) => {
        if (fileNameHash[i.fileName]) {
          fileNameHash[i.fileName]++;
        } else {
          fileNameHash[i.fileName] = 1;
        }

        //matching ids
        if (i.id == cur.id && fileNameHash[i.fileName] == 1) {
          //now check to make sure kwarg values match
          let valuesMatch = true;
          for (let key of kwargs) {
            if (cur.kwargs[key] != i.kwargs[key]) {
              valuesMatch = false;
            }
          }
          if (valuesMatch && fileNameHash[i.fileName] == 1) {
            return i;
          }
        }
      }),
    ];
    newArr.push(temp);
  }
  return newArr;
}
