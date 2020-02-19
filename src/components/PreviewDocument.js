import React from "react";
import PreviewCard from "./PreviewCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuestionList = styled.div`
    background: ${props => (props.isDraggingOver ? "lightblue" : "lightgrey")}
    padding: 10px;
    width: 100%
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

export default function PreviewDocument({ state, dispatch }) {
  const questions = state.document.questions;

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    //dispatch
    dispatch({
      type: "UPDATE_ORDER",
      updatedQuestions: items
    });
  }

  if (questions.length === 0) {
    return <p>No items!</p>;
  }

  return (
    <Section>
      <h1>YO CHECK THIS OUT</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <QuestionList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {questions.map((question, index) => (
                <PreviewCard
                  question={question}
                  dispatch={dispatch}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </QuestionList>
          )}
        </Droppable>
      </DragDropContext>
    </Section>
  );
}
