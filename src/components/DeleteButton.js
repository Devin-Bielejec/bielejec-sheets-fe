import React from "react";
import { Button } from "./Styles";
import { BsTrash3Fill } from "react-icons/bs";
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

function DeleteButton({ all, handleConfirmation, ...rest }) {
  return (
    <Button>
      <DeleteIconContainer onClick={() => handleConfirmation(false)}>
        <BsTrash3Fill />
      </DeleteIconContainer>
      <p>Delete All</p>
    </Button>
  );
}

export default DeleteButton;
