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

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const DifficultyButton = styled.button`
  background-color: white;
  color: black;
  width: 50%;
  height: 50%;
`;

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

  function handleChangeDifficultyClick(fileName) {
    setCurrentQuestion(questionGroup.filter((i) => i.fileName == fileName)[0]);
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
      <Container>
        <h3>Difficulty: </h3>

        {questionGroup.map((i) => (
          <DifficultyButton
            difficulty={i.kwargs.difficulty}
            id={i.fileName}
            onClick={() => handleChangeDifficultyClick(i.fileName)}
          >
            {i.kwargs.difficulty}
          </DifficultyButton>
        ))}
      </Container>
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
