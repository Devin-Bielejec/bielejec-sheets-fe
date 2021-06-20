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
  const imgURL = question.imgURL;

  //We'll add ability to add more than one question later
  const handleClick = (question) => {
    dispatch({
      type: "ADD_QUESTION",
      question: question,
    });
  };

  return (
    <StyledCard key={id} id={id}>
      <Image src={imgURL} />
      {/* button to add integer amounts*/}
      <Button onClick={() => handleClick(question)}>Add Question</Button>
      <form>
        {Object.keys(question.kwargs).map((key) => {
          let curArr = question.kwargs[key];
          console.log(curArr);
          //if kwarg is array 1 < len < 7 --> radio buttons
          if (curArr.length > 1 && curArr.length < 7) {
            //radio buttons
            return (
              <section>
                <h3>{key}</h3>
                {curArr.map((item) => {
                  return (
                    <>
                      <input
                        key={item.value}
                        type="radio"
                        value={item.value}
                        name={item.value}
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
            //select
            return (
              <section>
                <label htmlFor={key}>{key}</label>
                <select key={key} name={key} id={key}>
                  {curArr.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </section>
            );
          } else {
            //checkbox since length should be equal to 1
            return (
              <section>
                <h3>{key}</h3>
                <input
                  type="checkbox"
                  key={curArr[0].value}
                  value={curArr[0].value == "True" ? "checked" : "unchecked"}
                  name={curArr[0].value}
                />
                <label htmlFor={curArr[0].value} />
              </section>
            );
          }
        })}
      </form>
    </StyledCard>
  );
}
