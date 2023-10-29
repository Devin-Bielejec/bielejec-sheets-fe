import React from "react";
import styled from "styled-components";
import Select from "./Select";
import { connect } from "react-redux";
import { updateDisplayedQuestions } from "../actions/updateDisplayedQuestions";
import { devices } from "../utils/constants";

const FilterStyled = styled.section`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  @media only screen and ${devices.md} {
    flex-direction: column;
  }
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
    console.log("select state", allQuestions);
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

  //set default select state when allquestions are changed
  React.useEffect(() => {
    console.log("this is triggered");
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
    setSelectState({
      subject: { items: subjects, current: startingSubject },
      topic: { items: topics, current: startingTopic },
      skill: { items: skills, current: startingSkill },
      subSkill: { items: subSkills, current: startingSubSkill },
    });
  }, [allQuestions]);

  React.useEffect(() => {
    console.log("filter use effect", allQuestions);
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
          selectState.skill.current === "" ||
          selectState.skill.current === undefined
            ? true
            : selectState.skill.current === item.skill;
        let subSkillMatch =
          selectState.subSkill.current === "" ||
          selectState.subSkill === undefined
            ? true
            : selectState.subSkill.current === item.subSkill;
        return subjectMatch && topicMatch && skillMatch && subSkillMatch;
      })
    );
  }, [selectState, allQuestions]);

  function handleSelect(e) {
    let attribute = e.target.name;
    let value = e.target.value;

    let curSubject, curSkill, curTopic, curSubSkill;
    let subjects, topics, skills, subSkills;
    if (attribute == "subject") {
      curSubject = value;
      topics = getUniqueNamesBy(
        "topic",
        filterBy(allQuestions, [["subject", curSubject]])
      );
      curTopic = topics[0];
      skills = getUniqueNamesBy(
        "skill",
        filterBy(allQuestions, [
          ["subject", curSubject],
          ["topic", curTopic],
        ])
      );
      curSkill = skills[0];
      subSkills = getUniqueNamesBy(
        "subSkill",
        filterBy(allQuestions, [
          ["subject", curSubject],
          ["topic", curTopic],
          ["skill", curSkill],
        ])
      );
      curSubSkill = subSkills[0];
    } else if (attribute == "topic") {
      subjects = getUniqueNamesBy("subject", allQuestions);
      curSubject = selectState.subject.current;
      curTopic = value;
      skills = getUniqueNamesBy(
        "skill",
        filterBy(allQuestions, [
          ["subject", curSubject],
          ["topic", curTopic],
        ])
      );
      curSkill = skills[0];
      subSkills = getUniqueNamesBy(
        "subSkill",
        filterBy(allQuestions, [
          ["subject", curSubject],
          ["topic", curTopic],
          ["skill", curSkill],
        ])
      );
      curSubSkill = subSkills[0];
      console.log(subSkills);
    } else if (attribute == "skill") {
      subjects = getUniqueNamesBy("subject", allQuestions);

      //get previous values from state
      curSubject = selectState.subject.current;
      curTopic = selectState.topic.current;

      //get value from select
      curSkill = value;
      subSkills = getUniqueNamesBy(
        "subSkill",
        filterBy(allQuestions, [
          ["subject", curSubject],
          ["topic", curTopic],
          ["skill", curSkill],
        ])
      );
      console.log(subSkills);
      curSubSkill = subSkills[0];
    } else if (attribute == "subSkill") {
      curSubSkill = value;
    }
    console.log(curSubSkill, !curSubSkill);
    //for each if defined go with value, if not go with state
    setSelectState({
      subject: {
        items: subjects ? subjects : selectState.subject.items,
        current:
          curSubject !== undefined ? curSubject : selectState.subject.current,
      },
      topic: {
        items: topics ? topics : selectState.topic.items,
        current: curTopic !== undefined ? curTopic : selectState.topic.current,
      },
      skill: {
        items: skills ? skills : selectState.skill.items,
        current: curSkill !== undefined ? curSkill : selectState.skill.current,
      },
      subSkill: {
        items: subSkills ? subSkills : selectState.subSkill.items,
        current:
          curSubSkill !== undefined
            ? curSubSkill
            : selectState.subSkill.current,
      },
    });
  }
  return (
    <FilterStyled>
      <StyledForm>
        {displayedQuestions &&
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
