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
  Image,
} from "./Styles";
import NumberInput from "./NumberInput.js";

const DifficultyButton = styled.button`
  background-color: white;
  color: black;
  width: 3rem;
  height: 3rem;
  border-color: gray;
  border: 1px solid;
  &:hover {
    cursor: pointer;
    border: 3px solid black;
  }
`;

const ButtonsGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 30px;
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
    <Flex margin="20px" justifyContent="center" key={id} id={id}>
      <Background>
        <Image src={baseURLStatic + currentQuestion.fileName + ".jpg"} />

        {questionGroup[0].kwargs.difficulty && (
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>Choose Difficulty: </h3>
            <ButtonsGroup>
              {questionGroup.map((i) => (
                <DifficultyButton
                  difficulty={i.kwargs.difficulty}
                  id={i.fileName}
                  onClick={() => handleChangeDifficultyClick(i.fileName)}
                >
                  {i.kwargs.difficulty}
                </DifficultyButton>
              ))}
            </ButtonsGroup>
          </Flex>
        )}
        <NumberInput
          questionCount={questionCount}
          handleQuestionCountChange={handleQuestionCountChange}
        />
        <Button onClick={() => handleAddQuestionClick()}>Add Questions</Button>
      </Background>
    </Flex>
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
