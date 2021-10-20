import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "./Styles.js";

import { connect } from "react-redux";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js.js";
import { UPDATE_DOCUMENT_QUESTIONS_SUCCESS } from "../actions/index.js";

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

function PreviewCard({
  index,
  question,
  documentQuestions,
  updateDocumentQuestions,
}) {
  const id = question.fileName;
  const imgURL = question.fileName;
  console.log(question);

  const handleClick = (fileName, index) => {
    //remove question
    updateDocumentQuestions([
      ...documentQuestions.slice(0, index),
      ...documentQuestions.slice(index + 1),
    ]);
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
          <IndexTitle>{index + 1}</IndexTitle>
          {/* {Object.keys(question.kwargs).map((kwarg) => {
            return (
              <div>
                {Object.keys(question.kwargs[kwarg]).map((option) => {
                  console.log(option);
                  if (question.kwargs[kwarg][option].selected) {
                    return (
                      <p key={option}>
                        {kwarg}:{question.kwargs[kwarg][option].value}
                      </p>
                    );
                  }
                })}
              </div>
            );
          })} */}
          <Image
            src={require(`F:/code/bielejec-sheets-be/creatingWorksheets/images/${question.fileName}.jpg`)}
          />
          <Button onClick={() => handleClick(question.fileName, index)}>
            Remove Question
          </Button>
        </StyledCard>
      )}
    </Draggable>
  );
}

const mapStateToProps = (state) => {
  return {
    documentQuestions: state.document.questions,
  };
};
export default connect(mapStateToProps, {
  updateDocumentQuestions,
})(PreviewCard);
