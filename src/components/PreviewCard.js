import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "./Styles.js";

const StyledCard = styled.div`
  padding: 5px;
  width: 50%;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  user-select: none;
  background-color: ${(props) => (props.isDragging ? "lightgrey" : "")};
  //not putting default draggingStyles
`;

const Image = styled.img`
  width: 90%;
`;

const IndexTitle = styled.h2`
  align-self: start;
  padding-left: 10px;
  z-index: -10;
`;

export default function PreviewCard({ question, dispatch, index }) {
  const id = question.id;
  const imgURL = question.imgURL;

  //We'll add ability to add more than one question later
  const handleClick = (id, index) => {
    dispatch({
      type: "REMOVE_QUESTION",
      questionID: id,
      index: index,
    });
  };

  return (
    <Draggable
      key={`item-${index}`}
      draggableId={`item-${index}`}
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
          <IndexTitle>{index}</IndexTitle>
          <Image src={require(`../img/${id}.jpg`)} />
          <Button onClick={() => handleClick(question.id, index)}>
            Remove Question
          </Button>
        </StyledCard>
      )}
    </Draggable>
  );
}
