import React from "react";
import { Button } from "./Styles";
import { BsTrash3Fill, BsShuffle } from "react-icons/bs";
import styled from "styled-components";

const DeleteIconContainer = styled.div`
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
`;

const ButtonStyled = styled(Button)`
  border: 0px;
  border-radius: 20%;
`;
function ActionButton({ name, all, handleClick, ...rest }) {
  return (
    <ButtonStyled>
      <DeleteIconContainer
        onClick={() => (name == "delete" ? handleClick(false) : handleClick())}
      >
        {name == "delete" ? <BsTrash3Fill /> : <BsShuffle />}
      </DeleteIconContainer>
      <p>{name == "delete" ? "Delete All" : "Shuffle"}</p>
    </ButtonStyled>
  );
}

export default ActionButton;
