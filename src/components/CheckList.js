import React, { useState, useReducer, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckBoxForm, StyledInput, Warning } from "./Styles.js";
import styled from "styled-components";
import { baseURL } from "../utils/index.js";
import axios from "axios";

export default function CheckList({ items, itemName, dispatch, handleChange }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const [currentItems, setCurrentItems] = useState([...items]);

  const toggleCheckBox = valueToggled => {
    let currentItemsCopy = currentItems.map(item => {
      if (item.value === valueToggled) {
        item.selected = !item.selected;
      }
      return item;
    });
    setCurrentItems(currentItemsCopy);
  };

  const handleChangeCheckList = data => {
    let currentSelectedItems = [...currentItems].filter(item => item.selected);
    handleChange({ name: itemName, values: [...currentSelectedItems] });
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
                onChange={handleChangeCheckList}
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
