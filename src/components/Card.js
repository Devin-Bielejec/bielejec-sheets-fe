import React from "react";
import styled from "styled-components";
import { Button } from "./Styles.js";

const StyledCard = styled.div`
  padding: 5px;
  width: 40%;
  border: 1px solid black;
  border-radius: 15px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
`;

const Image = styled.img`
  width: 90%;
  max-width: 500px;
`;

export default function Card({ question, dispatch }) {
  const id = question.id;
  const [questionCount, setQuestionCount] = React.useState(1);
  //add selected to kwargs with more than one option
  Object.keys(question.kwargs).forEach((kwarg) => {
    Object.keys(question.kwargs[kwarg]).forEach((oKey, i) => {
      let o = question.kwargs[kwarg][oKey];
      if (Object.keys(question.kwargs[kwarg]).length > 1) {
        o.selected = i == 0;
      } else {
        o.selected = o.value == "true" || o.value == "True";
      }
    });
  });
  const [questionToAdd, setQuestionToAdd] = React.useState({ ...question });

  function handleQuestionCountChange(e) {
    setQuestionCount(e.target.value);
  }

  //We'll add ability to add more than one question later
  const handleAddQuestionClick = (question) => {
    dispatch({
      type: "ADD_QUESTION",
      question: question,
    });
  };

  //For radio buttons or select
  function handleRadioOrSelectChange(key, e) {
    let selectedKwarg = key;
    let value = e.target.value;

    //copy question to add - we're going to modify a kwarg
    let questionToAddCopy = { ...questionToAdd };

    //looking at all the options underneath a kwarg - make all choices false unless chosen
    Object.keys(questionToAddCopy.kwargs[selectedKwarg]).forEach(
      (optionKey) => {
        if (optionKey == value) {
          questionToAddCopy = {
            ...questionToAddCopy,
            kwargs: {
              ...questionToAddCopy.kwargs,
              [selectedKwarg]: {
                ...questionToAddCopy.kwargs[selectedKwarg],
                [optionKey]: {
                  ...questionToAddCopy.kwargs[selectedKwarg][optionKey],
                  selected: true,
                },
              },
            },
          };
        } else {
          questionToAddCopy = {
            ...questionToAddCopy,
            kwargs: {
              ...questionToAddCopy.kwargs,
              [selectedKwarg]: {
                ...questionToAddCopy.kwargs[selectedKwarg],
                [optionKey]: {
                  ...questionToAddCopy.kwargs[selectedKwarg][optionKey],
                  selected: false,
                },
              },
            },
          };
        }
      }
    );
    setQuestionToAdd({ ...questionToAddCopy });
  }
  console.log(id);
  return (
    <StyledCard key={id} id={id}>
      <Image src={require(`../img/${id}.jpg`)} />
      {/* button to add integer amounts*/}
      <form>
        {Object.keys(question.kwargs).map((kwarg) => {
          //use array form to see if we have any bools
          let curArr = Object.keys(question.kwargs[kwarg]);

          //if kwarg is array 1 < len < 7 --> radio buttons
          if (curArr.length > 1 && curArr.length < 7) {
            //radio buttons
            return (
              <section>
                <h3>{kwarg}</h3>
                {curArr.map((itemKey) => {
                  let item = question.kwargs[kwarg][itemKey];
                  return (
                    <>
                      <input
                        key={item.value}
                        type="radio"
                        value={item.value}
                        checked={questionToAdd.kwargs[kwarg][itemKey].selected}
                        name={kwarg}
                        onChange={(e) => handleRadioOrSelectChange(kwarg, e)}
                      />

                      <label htmlFor={item.value}>
                        {item.value} ({item.toolTip})
                      </label>
                    </>
                  );
                })}
              </section>
            );
          } else if (curArr.length >= 7) {
            let selectedValue = Object.keys(questionToAdd.kwargs[kwarg]).filter(
              (item) => questionToAdd.kwargs[kwarg][item].selected
            )[0];

            return (
              <section>
                <label htmlFor={kwarg}>{kwarg}</label>
                <select
                  key={kwarg}
                  name={kwarg}
                  id={kwarg}
                  value={selectedValue}
                  onChange={(e) => handleRadioOrSelectChange(kwarg, e)}
                >
                  {curArr.map((itemKey) => {
                    let item = question.kwargs[kwarg][itemKey];
                    return (
                      <option key={item.value} value={item.value}>
                        {item.value} ({item.toolTip})
                      </option>
                    );
                  })}
                </select>
              </section>
            );
          } else {
            //checkbox since length should be equal to 1
            let selectedValue = Object.keys(questionToAdd.kwargs[kwarg]).filter(
              (item) => questionToAdd.kwargs[kwarg][item].selected
            )[0];
            return (
              <section>
                <h3>{kwarg}</h3>
                <input
                  type="checkbox"
                  key={curArr[0].value}
                  value={selectedValue ? "checked" : "unchecked"}
                  name={curArr[0].value}
                />
                <label htmlFor={curArr[0].value} />
              </section>
            );
          }
        })}
      </form>
      <input
        type="number"
        name="questionCount"
        value={questionCount}
        onChange={handleQuestionCountChange}
      />
      <Button onClick={() => handleAddQuestionClick(question)}>
        Add Question
      </Button>
    </StyledCard>
  );
}
