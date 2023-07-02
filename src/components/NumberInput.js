import React from "react";
import styled from "styled-components";

const Input = styled.input`
  text-align: center;
  width: 50%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function NumberInput({
  questionCount,
  handleQuestionCountChange,
}) {
  const colors = {
    add: "green",
    subtract: "red",
  };
  //callback arrow function allows us to pass values
  return (
    <InputContainer>
      <Button color={"#f44336"} onClick={() => handleQuestionCountChange(-1)}>
        -
      </Button>
      <Input type="numeric" name="questionCount" value={questionCount} />
      <Button color={"#4CAF50"} onClick={() => handleQuestionCountChange(1)}>
        +
      </Button>
    </InputContainer>
  );
}
