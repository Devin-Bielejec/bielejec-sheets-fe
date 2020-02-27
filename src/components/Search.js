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

export default function Search({ state, dispatch }) {
  console.log(state);
  //Default questions - nothing selected

  function handleChange(key, itemValue) {
    //update values on sidebar via the state - toggled selected on property

    //item is {value: , selected: }
    let copyState = {
      ...state,
      [key]: state[key].map(item => {
        console.log(item, itemValue);
        if (item.value === itemValue) {
          item.selected = !item.selected;
        }
        return item;
      })
    };

    console.log(copyState);

    // update displayed questions
    axios
      .post(`${baseURL}/questions/questionsByFilter`, {
        topic: copyState.topics,
        subject: copyState.subjects,
        standard: copyState.standards,
        type: copyState.types
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: "UPDATE_DISPLAYED_QUESTIONS",
          displayedQuestions: [...res.data.displayedQuestions]
        });
      });

    if (key === "subject") {
      //update sidebar
      axios
        .post(`${baseURL}/questions/sideBarBySubjects`, { subjects: itemValue })
        .then(res => {
          console.log("inside sidebarbysubject", res);
          //keep subjects that are checked as selected - everything else resets

          dispatch({
            type: "UPDATE_SIDEBAR_OPTIONS",
            subjects: state.subjects,
            topics: [...res.data.topics],
            standards: [...res.data.standards],
            types: [...res.data.types]
          });
        });
    }
  }

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
          {state.displayedQuestions.map(question => (
            <Card question={question} dispatch={dispatch} />
          ))}
        </DisplayedQuestions>
      </Main>
    </>
  );
}
