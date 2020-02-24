import React, { useState } from "react";
import styled from "styled-components";
import CheckList from "./CheckList.js";
import axios from "axios";
import { baseURL } from "../utils/index";

const SideBarStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;
export default function SideBar({ state, dispatch }) {
  const topics = state.topics;
  const subjects = state.subjects;
  const standards = state.standards;
  const questionTypes = state.questionTypes;

  const [currentSelectedItems, setCurrentSelectedItems] = useState({});

  const handleChange = data => {
    console.log(data);
    let currentSelectedItemsCopy = { ...data, ...currentSelectedItems };
    setCurrentSelectedItems(currentSelectedItemsCopy);
    console.log(currentSelectedItemsCopy);
    axios
      .post(`${baseURL}/getQuestionsByFilter`, currentSelectedItemsCopy)
      .then(res => {
        console.log(res);
        //then we'll most likely dispatch in here
        dispatch({
          type: "UPDATE_DISPLAYED_QUESTIONS",
          displayedQuestions: res.data.displayedQuestions
        });
      });
  };

  /* itemNames are based on what back end wants */
  return (
    <SideBarStyled>
      <CheckList
        handleChange={handleChange}
        items={subjects}
        itemName={"subject"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={topics}
        itemName={"topic"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={standards}
        itemName={"standard"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={questionTypes}
        itemName={"type"}
        dispatch={dispatch}
      />
    </SideBarStyled>
  );
}
