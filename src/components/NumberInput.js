import React from "react";
import styled from "styled-components";

export default function NumberInput({
  questionCount,
  handleQuestionCountChange,
}) {
  //callback arrow function allows us to pass values
  return (
    <div>
      <button onClick={() => handleQuestionCountChange(-1)}>-</button>
      <input type="number" name="questionCount" value={questionCount} />
      <button onClick={() => handleQuestionCountChange(1)}>+</button>
    </div>
  );
}
