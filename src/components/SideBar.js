import React from "react";
import styled from "styled-components";

const SideBarStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;
export default function SideBar() {
  return (
    <SideBarStyled>
      <h1>This is a sidebar!</h1>
    </SideBarStyled>
  );
}
