import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckList from "./CheckList.js";
import axios from "axios";
import { baseURL } from "../utils/index";

const SideBarStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;
export default function SideBar({ state, dispatch, handleChange }) {
  /* itemNames are based on what back end wants */
  return (
    <SideBarStyled>
      <CheckList
        handleChange={handleChange}
        items={state.subjects}
        itemName={"subjects"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={state.topics}
        itemName={"topics"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={state.standards}
        itemName={"standards"}
        dispatch={dispatch}
      />
      <CheckList
        handleChange={handleChange}
        items={state.types}
        itemName={"types"}
        dispatch={dispatch}
      />
    </SideBarStyled>
  );
}
