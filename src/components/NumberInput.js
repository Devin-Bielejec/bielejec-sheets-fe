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
  background-color: white;
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  border: 1px solid blue;

  opacity: ${(props) => (props.disabled ? "0.5;" : "")};
  pointer-events: ${(props) => (props.disabled ? "none" : "")};

  &:hover {
    background-color: rgba(190, 227, 248, 1);
    cursor: pointer;
  }
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
        name="minus"
        color={"#f44336"}
        onClick={() => handleQuestionCountChange(-1)}
        disabled={questionCount <= 1}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          class="icon"
        >
          <line x1="0" y1="8" x2="16" y2="8" stroke="blue" stroke-width="2" />
        </svg>
      </Button>
      <Input type="numeric" name="questionCount" value={questionCount} />
      <Button
        name="add"
        color={"#4CAF50"}
        onClick={() => handleQuestionCountChange(1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          class="icon"
        >
          <line
            x1="8"
            y1="4.37114e-08"
            x2="8"
            y2="16"
            stroke="blue"
            stroke-width="2"
          />
          <line y1="8" x2="16" y2="8" stroke="blue" stroke-width="2" />
        </svg>
      </Button>
    </InputContainer>
  );
}
