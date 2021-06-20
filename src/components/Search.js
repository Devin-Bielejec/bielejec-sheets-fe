import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/index.js";
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

export default function Search({ state, dispatch, handleChange }) {
  console.log(state);
  //Default questions - nothing selected

  return (
    <>
      <h1>This is the search page where we can find questions!</h1>
      <Main>
        <SideBar
          state={state}
          dispatch={dispatch}
          handleChange={handleChange}
        />
        <DisplayedQuestions>
          {state.displayedQuestions.map((question, i) => (
            <Card question={question} dispatch={dispatch} key={i} />
          ))}
        </DisplayedQuestions>
      </Main>
    </>
  );
}
