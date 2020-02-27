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
  return (
    <CheckBoxForm>
      <h2>{itemName.charAt(0).toUpperCase() + itemName.slice(1)}</h2>
      {items.map(item => {
        return (
          <>
            <label
              key={item}
              for={item.value}
              onClick={() => handleChange(itemName, item.value)}
            >
              <input
                // onChange={() => handleChange(itemName, item.value)}
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
