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
import NumberInput from "./NumberInput.js";

const StyledCard = styled.div`
  width: 40%;
  border: 1px solid black;
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
  max-width: 400px;
  object-fit: contain;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid gray;
`;

//

function Card({
  documentQuestions,
  updateDocumentQuestions,
  questionGroup,
  ...rest
}) {
  const [questionCount, setQuestionCount] = React.useState(1);
  const [currentQuestion, setCurrentQuestion] = React.useState(
    questionGroup[0]
  );
  const id = currentQuestion.id;

  function handleQuestionCountChange(val) {
    //So question count cannot be less than 0 for the user
    if (questionCount + val >= 0) {
      setQuestionCount(questionCount + val);
    }
  }

  //We'll add ability to add more than one question later
  const handleAddQuestionClick = () => {
    //add count many questions
    let questionArr = [];
    for (let i = 0; i < questionCount; i++) {
      questionArr.push(currentQuestion);
    }
    console.log("click");
    updateDocumentQuestions([...documentQuestions, ...questionArr]);
  };

  return (
    <StyledCard key={id} id={id}>
      <Image src={baseURLStatic + currentQuestion.fileName + ".jpg"} />
      <NumberInput
        questionCount={questionCount}
        handleQuestionCountChange={handleQuestionCountChange}
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
