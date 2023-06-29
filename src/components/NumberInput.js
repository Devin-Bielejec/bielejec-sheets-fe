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
      <Button
        color={"green"}
        name="add"
        onClick={() => handleQuestionCountChange(-1)}
      >
        -
      </Button>
      <Input type="numeric" name="questionCount" value={questionCount} />
      <Button color={"red"} onClick={() => handleQuestionCountChange(1)}>
        +
      </Button>
    </InputContainer>
  );
}
