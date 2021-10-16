import React from "react";
import styled from "styled-components";
import Select from "./Select";
import { connect } from "react-redux";
import { updateDisplayedQuestions } from "../actions/updateDisplayedQuestions";

const FilterStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

const StyledForm = styled.form`
  display: flex;
`;

function getUniqueNamesBy(property, array, additionalProperty = null) {
  let hash = {};

  for (let item of array) {
    hash[item[property]] = hash[item[property]] || 1;
    if (additionalProperty) {
      hash[item[additionalProperty]] = hash[item[additionalProperty]] || 1;
    }
  }

  return Object.keys(hash);
}

/*
get details from state.questions
selectQuestions = state.questions
SELECT Subject - all subjects from state.questions
SELECT Topic (/subTopic) - all topics that have said topic
SELECT Skill (/subSkill) - all skills that have said subject and topic
*/

//connect to redux for updateDisplayQuestions state

function Filter({
  allQuestions,
  displayedQuestions,
  updateDisplayedQuestions,
  ...rest
}) {
  let [selectState, setSelectState] = React.useState({
    subject: {
      disabled: false,
      items: allQuestions ? getUniqueNamesBy("subject", allQuestions) : [],
      current: displayedQuestions
        ? getUniqueNamesBy("subject", displayedQuestions)[0]
        : [],
    },
    topic: { disabled: true, items: [], current: "" },
    skill: { disabled: true, items: [], current: "" },
  });

  React.useState(() => {
    console.log("SELECT USE STATE");
    updateDisplayedQuestions(
      allQuestions.filter((item) => {
        //equal to current subject
        if (item.subject === selectState.subject.current) {
          //if topic is equal
          if (
            selectState.topic.current !== "" &&
            (selectState.topic.current === item.topic ||
              selectState.topic.current === item.subTopic)
          ) {
            //if skill is equal
            if (
              selectState.skill.current !== "" &&
              (selectState.skill.current === item.skill ||
                selectState.skill.current === item.subSkill)
            ) {
              return true;
            }
          }
        }
        return false;
      })
    );
  }, [selectState, setSelectState]);

  function handleSelect(e) {
    let attribute = e.target.name;
    let value = e.target.value;

    console.log("handle select", attribute, value);

    let curSub = selectState.subject.current;
    let curTop = selectState.topic.current;
    let curSki = selectState.skill.current;

    if (attribute === "subject") {
      curSub = value;
      //if subject, update topics
      let topics = {};
      allQuestions.forEach((item) => {
        if (item.subject == curSub) {
          if (item.topic && !topics[item.topic]) {
            topics[item.topic] = 1;
          }

          if (item.subTopic && !topics[item.subTopic]) {
            topics[item.subTopic] = 1;
          }
        }
      });

      let newState = {
        ...selectState,
        subject: { ...selectState.subject, current: value },
        topic: {
          ...selectState.topic,
          current: Object.keys(topics)[0],
          disabled: false,
          items: Object.keys(topics),
        },
      };

      setSelectState(newState);
      console.log(allQuestions);
      console.log(newState);
      updateDisplayedQuestions(
        allQuestions.filter((item) => {
          //equal to current subject
          if (item.subject === newState.subject.current) {
            //if topic is equal
            if (
              newState.topic.current !== "" &&
              (newState.topic.current === item.topic ||
                newState.topic.current === item.subTopic)
            ) {
              return true;
            }
          }
          return false;
        })
      );
    } else if (attribute === "topic") {
      curTop = value;
      //if topic changes update skill
      let skills = {};
      displayedQuestions.forEach((item) => {
        if (item.topic == curTop) {
          if (item.skill && !skills[item.skill]) {
            skills[item.skill] = 1;
          }

          if (item.subSkill && !skills[item.subSkill]) {
            skills[item.subSkill] = 1;
          }
        }
      });
      setSelectState({
        ...selectState,
        topic: { ...selectState.topic, current: curTop },
        skill: {
          ...selectState.skill,
          disabled: false,
          items: Object.keys(skills),
        },
      });
    } else if (attribute === "skill") {
      curSki = value;
      setSelectState({
        ...selectState,
        skill: { ...selectState.skill, current: curSki },
      });
    }

    //if topic, update skills
  }

  return (
    <FilterStyled>
      <StyledForm>
        {allQuestions &&
          Object.keys(selectState).map((item, i) => (
            <Select
              key={i}
              handleChange={handleSelect}
              options={selectState[item].items}
              name={item}
              disabled={selectState[item].disabled}
              selectedOption={selectState[item].current}
            />
          ))}
      </StyledForm>
    </FilterStyled>
  );
}

const mapStateToProps = (state) => {
  return {
    allQuestions: state.allQuestions,
    displayedQuestions: state.displayedQuestions,
  };
};
export default connect(mapStateToProps, { updateDisplayedQuestions })(Filter);
