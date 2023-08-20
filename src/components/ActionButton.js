import React from "react";
import { Button } from "./Styles";
import { BsTrash3Fill, BsShuffle } from "react-icons/bs";
import styled from "styled-components";

const IconContainer = styled.div`
  text-align: center;
  background-color: white;
  font-size: 50px;
  border: 0px solid white;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  padding: 0;
  margin: auto;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
`;

const ButtonStyled = styled(Button)`
  max-width: 100%;
  margin-top: 0px;
  border: 0px;
  // display: grid;
  // grid-template-rows: 1fr 1fr 1fr 1fr;
  // grid-template-columns: 1fr 1fr 1fr 1fr;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  grid-row-start: 4;
  grid-column: 2 / span 2;
  padding: 0px;
  line-height: 0px;
`;
function ActionButton({ name, all, handleClick, ...rest }) {
  return (
    <ButtonStyled>
      <IconContainer
        onClick={() => (name == "delete" ? handleClick(false) : handleClick())}
      >
        {name == "delete" ? <BsTrash3Fill /> : <BsShuffle />}
      </IconContainer>
      <Text>{name == "delete" ? "Delete All" : "Shuffle"}</Text>
    </ButtonStyled>
  );
}

export default ActionButton;
