import React from "react";
import PreviewCard from "./PreviewCard.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js.js";
import { shuffle } from "../utils/index";
import { Button } from "./Styles.js";
import ActionButton from "./ActionButton.js";

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

const PreviewButtons = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  padding: 0 50px 0 50px;
`;

const Confirmation = styled.section`
  grid-column-start: 1;
  grid-column-end: 3;
`;

function PreviewDocument({
  documentQuestions,
  updateDocumentQuestions,
  ...rest
}) {
  //For confirmation on removing questions
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  function handleRemoveAll(e) {
    console.log(e);

    updateDocumentQuestions([]);
  }

  function handleConfirmation(b) {
    setShowConfirmation(!b);
  }

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

  if (documentQuestions.length === 0) {
    return <p>No items!</p>;
  }

  return (
    <Section>
      <h1>Preview Your Questions</h1>
      <PreviewButtons>
        <ActionButton name="shuffle" handleClick={handleShuffle} />
        <ActionButton
          name="delete"
          handleClick={handleConfirmation}
          all={true}
        />
        {showConfirmation && (
          <Confirmation>
            Do you want to delete all?
            <Button onClick={() => handleConfirmation(true)}>Cancel</Button>
            <Button onClick={handleRemoveAll}>Yes</Button>
          </Confirmation>
        )}
      </PreviewButtons>

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
