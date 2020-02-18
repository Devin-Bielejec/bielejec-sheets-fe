import React from "react";
import styled from "styled-components";
import CheckList from "./CheckList.js";

const SideBarStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;
export default function SideBar({ state }) {
  const topics = state.topics;
  const subjects = state.subjects;
  const standards = state.standards;
  const questionTypes = state.questionTypes;
  return (
    <SideBarStyled>
      <CheckList items={topics} itemName={"Topics"} />
      <CheckList items={subjects} itemName={"Subjects"} />
      <CheckList items={standards} itemName={"Standards"} />
      <CheckList items={questionTypes} itemName={"Question Types"} />
    </SideBarStyled>
  );
}
