import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const StyledCard = styled.div`
  padding: 5px;
  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  user-select: none;
  background-color: ${props => (props.isDragging ? "lightgrey" : "")};
  //not putting default draggingStyles
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
export default function Card({
  question,
  dispatch,
  isDragging,
  draggableStyles,
  index
}) {
  const id = question.id;
  const imgURL = question.imgURL;

  //We'll add ability to add more than one question later
  const handleClick = (id, index) => {
    dispatch({
      type: "REMOVE_QUESTION",
      questionID: id,
      index: index
    });
  };

  return (
    <Draggable
      key={`item-${question.id}`}
      draggableId={`item-${question.id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          draggableStyles={provided.draggableProps.style}
        >
          <Image src={imgURL} />
          <Button onClick={() => handleClick(id, index)}>
            Remove Question
          </Button>
        </StyledCard>
      )}
    </Draggable>
  );
}
