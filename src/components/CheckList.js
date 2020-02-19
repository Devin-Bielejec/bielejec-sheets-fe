import React, { useState, useReducer, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckBoxForm, StyledInput, Warning } from "./Styles.js";
import styled from "styled-components";
import { baseURL } from "../utils/index.js";
import axios from "axios";

export default function CheckList({ items, itemName, dispatch }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const [currentItems, setCurrentItems] = useState([...items]);

  useEffect(() => {
    //get data from axios request everytime a currentItems are changed, then dispatch it to the reducer
    axios
      .post(`${baseURL}/getQuestionsByFilter`, { itemName: [...currentItems] })
      .then(res => {
        console.log(res);
        //then we'll most likely dispatch in here
        dispatch({
          type: "UPDATE_DISPLAYED_QUESTIONS",
          displayedQuestions: res.data.displayedQuestions
        });
      });
  }, [currentItems]);

  const toggleCheckBox = valueToggled => {
    let currentItemsCopy = currentItems.map(item => {
      if (item.value === valueToggled) {
        item.selected = !item.selected;
      }
      return item;
    });
    setCurrentItems(currentItemsCopy);
  };
  return (
    <CheckBoxForm>
      <h2>{itemName}</h2>
      {items.map(item => {
        return (
          <>
            <label
              key={item}
              for={item.value}
              onClick={() => toggleCheckBox(item.value)}
            >
              <input
                key={item}
                type="checkbox"
                name={item.value}
                ref={register}
                checked={item.selected}
              />
              {item.value}
            </label>
          </>
        );
      })}
    </CheckBoxForm>
  );
}
