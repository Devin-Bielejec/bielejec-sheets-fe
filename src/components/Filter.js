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

function filterBy(arr, propertyValueArr) {
  let newArr = [];
  //loop through each question object {topic, subTopic, subject, skill, subSkill}
  for (let i = 0; i < arr.length; i++) {
    let curItem = arr[i];

    //loop through each [prop: value]
    let addItemToNewArr = true;
    for (let j = 0; j < propertyValueArr.length; j++) {
      let property = propertyValueArr[j][0];
      let value = propertyValueArr[j][1];

      //check if item doesn't work for any property value
      if (curItem[property] !== value) {
        addItemToNewArr = false;
      }
    }
    if (addItemToNewArr) {
      newArr.push(curItem);
    }
  }
  return newArr;
}

function Filter({
  allQuestions,
  displayedQuestions,
  updateDisplayedQuestions,
  ...rest
}) {
  let [selectState, setSelectState] = React.useState(() => {
    let subjects = getUniqueNamesBy("subject", allQuestions);
    let startingSubject = subjects[0];

    let topics = getUniqueNamesBy(
      "topic",
      filterBy(allQuestions, [["subject", startingSubject]])
    );
    let startingTopic = topics[0];

    let skills = getUniqueNamesBy(
      "skill",
      filterBy(allQuestions, [
        ["subject", startingSubject],
        ["topic", startingTopic],
      ])
    );
    let startingSkill = skills[0];

    let subSkills = getUniqueNamesBy(
      "subSkill",
      filterBy(allQuestions, [
        ["subject", startingSubject],
        ["topic", startingTopic],
        ["skill", startingSkill],
      ])
    );
    let startingSubSkill = subSkills[0];
    return {
      subject: { items: subjects, current: startingSubject },
      topic: { items: topics, current: startingTopic },
      skill: { items: skills, current: startingSkill },
      subSkill: { items: subSkills, current: startingSubSkill },
    };
  });

  React.useEffect(() => {
    //filter of displayed questions for subject, topic, and skill
    updateDisplayedQuestions(
      allQuestions.filter((item) => {
        //Check if question has same current subject
        let subjectMatch = item.subject === selectState.subject.current;
        let topicMatch =
          selectState.topic.current === ""
            ? true
            : selectState.topic.current === item.topic;
        let skillMatch =
          selectState.skill.current === ""
            ? true
            : selectState.skill.current === item.skill;
        let subSkillMatch =
          selectState.subSkill.current === ""
            ? true
            : selectState.subSkill.current === item.subSkill;
        return subjectMatch && topicMatch && skillMatch && subSkillMatch;
      })
    );
  }, [selectState]);

  function handleSelect(e) {
    let attribute = e.target.name;
    let value = e.target.value;
    console.log(attribute, value);
    let startingSubject =
      attribute === "subject" ? value : selectState.subject.current;
    let subjects = getUniqueNamesBy("subject", allQuestions);

    let topics = getUniqueNamesBy(
      "topic",
      filterBy(allQuestions, [["subject", startingSubject]])
    );
    let startingTopic = attribute === "topic" ? value : topics[0];

    let skills = getUniqueNamesBy(
      "skill",
      filterBy(allQuestions, [
        ["subject", startingSubject],
        ["topic", startingTopic],
      ])
    );
    let startingSkill = attribute === "skill" ? value : skills[0];

    let subSkills = getUniqueNamesBy(
      "subSkill",
      filterBy(allQuestions, [
        ["subject", startingSubject],
        ["topic", startingTopic],
        ["skill", startingSkill],
      ])
    );
    let startingSubSkill = attribute === "subSkill" ? value : subSkills[0];

    console.log(startingSubSkill);
    setSelectState({
      subject: { items: subjects, current: startingSubject },
      topic: { items: topics, current: startingTopic },
      skill: { items: skills, current: startingSkill },
      subSkill: { items: subSkills, current: startingSubSkill },
    });
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
