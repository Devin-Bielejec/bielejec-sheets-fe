import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/index.js";

export default function Search() {
  const [imageSRC, setImageSRC] = useState("");

  axios.post(`${baseURL}/getImage`, { name: "Tacos" }).then(res => {
    console.log(res);
    // setImageSRC("../images/Tacos.jpg");
    //When the RES
  });
  return (
    <main>
      <h1>This is the search page where we can find questions!</h1>
      <img src="https://res.cloudinary.com/bestplacepics/image/upload/v1574374150/newpics/San%20Jose%20CA/txhqcasorftywe3p9cjy.jpg" />
    </main>
  );
}
