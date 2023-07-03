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
  let fileNameHash = {};

  for (let i = 0; i < array.length; i++) {
    let cur = array[i];
    let temp = [];
    if (fileNameHash[cur.fileName]) continue;

    fileNameHash[cur.fileName] = true;
    //get cur kwargs that aren't difficulty
    let kwargs = Object.keys(cur.kwargs).filter((i) => i != "difficulty");

    //add current item with rest of items filtered
    temp = [
      ...array.filter((i) => {
        //matching ids
        if (i.id == cur.id) {
          //now check to make sure kwarg values match
          let valuesMatch = true;
          for (let key of kwargs) {
            if (cur.kwargs[key] != i.kwargs[key]) {
              valuesMatch = false;
            }
          }

          //if kwargs match to current item
          if (valuesMatch) {
            //now that we're going to return this item, we want to make sure we don't use it again thus adding to hash
            fileNameHash[i.fileName] = true;
            return i;
          }
        }
      }),
    ];
    temp.sort((a, b) => a.kwargs.difficulty - b.kwargs.difficulty);
    newArr.push(temp);
  }
  return newArr;
}
