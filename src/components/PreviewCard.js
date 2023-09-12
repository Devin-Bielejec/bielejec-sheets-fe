import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Background, Button, Flex, Image } from "./Styles.js";

import { connect } from "react-redux";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js.js";
import { UPDATE_DOCUMENT_QUESTIONS_SUCCESS } from "../actions/index.js";
import { baseURLStatic } from "../utils/index.js";

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
      {(provided, snapshot) => {
        console.log(snapshot.isDragging);
        return (
          <Flex
            userSelect="none"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            draggableStyles={provided.draggableProps.style}
          >
            <Background border={snapshot.isDragging ? "1px solid grey" : ""}>
              <IndexTitle>{index + 1}</IndexTitle>
              <Image src={baseURLStatic + question.fileName + ".jpg"} />
              <Button onClick={() => handleClick(question.fileName, index)}>
                Remove Question
              </Button>
            </Background>
          </Flex>
        );
      }}
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
