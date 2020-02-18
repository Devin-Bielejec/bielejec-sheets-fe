import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/index.js";
import { reducer, initialState } from "../reducers/index.js";
import Card from "./Card.js";
import styled from "styled-components";
import SideBar from "./SideBar.js";

const DisplayedQuestions = styled.section`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  flex-flow: row nowrap;
`;

export default function Search() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //axios get request to get default questions to show up in search
  console.log(state.displayedQuestions);

  //axios call when the component mounts
  useEffect(() => {
    axios.post(`${baseURL}/getQuestionsByFilter`, {
      topics: [],
      subjects: [],
      standards: [],
      questionTypes: []
    });
  }, []);
  //then onChange functions that will make an axios request with the filters clicked
  return (
    <>
      <h1>This is the search page where we can find questions!</h1>
      <Main>
        <SideBar state={state} dispatch={dispatch} />
        <DisplayedQuestions>
          {state.displayedQuestions.map(question => (
            <Card question={question} />
          ))}
        </DisplayedQuestions>
      </Main>
    </>
  );
}
