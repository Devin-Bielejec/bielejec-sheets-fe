import React from "react";
import styled from "styled-components";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js";
import { connect } from "react-redux";
import { baseURLStatic } from "../utils/index.js";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
  StyledLink,
  Text,
  Button,
} from "./Styles";

const StyledCard = styled.div`
  padding: 10px;
  width: 40%;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  background-color: white;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  object-fit: contain;
  padding: 10px;
`;

//

function Card({
  documentQuestions,
  updateDocumentQuestions,
  question,
  ...rest
}) {
  const id = question.id;
  const [questionCount, setQuestionCount] = React.useState(1);

  function handleQuestionCountChange(e) {
    setQuestionCount(e.target.value);
  }

  //We'll add ability to add more than one question later
  const handleAddQuestionClick = () => {
    //add count many questions
    let questionArr = [];
    for (let i = 0; i < questionCount; i++) {
      questionArr.push(question);
    }
    console.log("click");
    updateDocumentQuestions([...documentQuestions, ...questionArr]);
  };

  return (
    <StyledCard key={id} id={id}>
      {/* TEMP Local image storage from BE */}
      <Image src={baseURLStatic + question.fileName + ".jpg"} />
      {Object.keys(question.kwargs).map((kwarg) => (
        <p>
          {kwarg}:{question.kwargs[kwarg]}
        </p>
      ))}
      <StyledInput
        type="number"
        name="questionCount"
        placehold={questionCount}
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      <Button onClick={() => handleAddQuestionClick()}>Add Questions</Button>
    </StyledCard>
  );
}

const mapStateToProps = (state) => {
  return {
    documentQuestions: state.document.questions,
  };
};
export default connect(mapStateToProps, {
  updateDocumentQuestions,
})(Card);
