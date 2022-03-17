import React from "react";
import PreviewCard from "./PreviewCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js.js";
import { shuffle } from "../utils/index";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuestionList = styled.div`
    background: ${(props) => (props.isDraggingOver ? "lightblue" : "lightgrey")}
    padding: 10px;
    width: 100%
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

function PreviewDocument({
  documentQuestions,
  updateDocumentQuestions,
  ...rest
}) {
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      documentQuestions,
      result.source.index,
      result.destination.index
    );

    updateDocumentQuestions(items);
  }

  function handleShuffle() {
    updateDocumentQuestions(shuffle(documentQuestions));
  }

  function handleRemove() {
    updateDocumentQuestions([]);
  }
  if (documentQuestions.length === 0) {
    return <p>No items!</p>;
  }

  return (
    <Section>
      <h1>YO CHECK THIS OUT</h1>
      <button onClick={handleShuffle}>Shuffle Questions</button>
      <button onClick={handleRemove}>Remove All Questions</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <QuestionList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {documentQuestions.map((question, index) => (
                <PreviewCard question={question} index={index} />
              ))}
              {provided.placeholder}
            </QuestionList>
          )}
        </Droppable>
      </DragDropContext>
    </Section>
  );
}

const mapStateToProps = (state) => {
  return {
    documentQuestions: state.document.questions,
  };
};
export default connect(mapStateToProps, {
  updateDocumentQuestions,
})(PreviewDocument);
