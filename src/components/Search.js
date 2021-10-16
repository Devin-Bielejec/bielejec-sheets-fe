import React from "react";
import Card from "./Card.js";
import styled from "styled-components";
import Filter from "./Filter.js";
import { updateAllQuestions } from "../actions/updateAllQuestions";
import { updateDisplayedQuestions } from "../actions/updateDisplayedQuestions";
import { connect } from "react-redux";

const DisplayedQuestions = styled.section`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  margin: 0 auto;
`;

const Main = styled.main``;

function Search({
  allQuestions,
  displayedQuestions,
  updateAllQuestions,
  updateDisplayedQuestions,
  ...rest
}) {
  React.useEffect(() => {
    // get default displayed questions
    updateAllQuestions();
    updateDisplayedQuestions(allQuestions);
  }, []);

  console.log("search displayedQuestions", displayedQuestions);
  return (
    <>
      <h1>This is the search page where we can find questions!</h1>
      <Main>
        <Filter />
        {displayedQuestions && displayedQuestions.length > 0 && (
          <DisplayedQuestions>
            {displayedQuestions.length > 0 &&
              displayedQuestions.map((question, i) => (
                <Card question={question} key={i} />
              ))}
          </DisplayedQuestions>
        )}
      </Main>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allQuestions: state.allQuestions,
    displayedQuestions: state.displayedQuestions,
  };
};
export default connect(mapStateToProps, {
  updateAllQuestions,
  updateDisplayedQuestions,
})(Search);
