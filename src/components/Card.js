import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 5px;
  width: 40%;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 90%;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  width: 100px;
  margin: 10px;
`;
export default function Card({ question, dispatch }) {
  console.log(question);
  const id = question.id;
  const imgURL = question.imgURL;

  //We'll add ability to add more than one question later
  const handleClick = question => {
    dispatch({
      type: "ADD_QUESTION",
      question: question
    });
  };

  return (
    <StyledCard id={id}>
      <Image src={imgURL} />
      <Button onClick={() => handleClick(question)}>Add Question</Button>
    </StyledCard>
  );
}
