import React from "react";
import Card from "./Card.js";
import styled from "styled-components";
import Filter from "./Filter.js";
import { updateAllQuestions } from "../actions/updateAllQuestions";
import { updateDisplayedQuestions } from "../actions/updateDisplayedQuestions";
import { updateDocumentQuestions } from "../actions/updateDocumentQuestions.js.js";
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
    updateAllQuestions();
  }, []);

  console.log("displayed Questions", displayedQuestions);
  return (
    <>
      <Main>
        <Filter />
        {displayedQuestions && displayedQuestions.length > 0 && (
          <DisplayedQuestions>
            {displayedQuestions.length > 0 &&
              displayedQuestions.map((questionGroup, i) => (
                <Card questionGroup={questionGroup} key={i} />
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
