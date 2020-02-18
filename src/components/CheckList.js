import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CheckBoxForm, StyledInput, Warning } from "./Styles.js";
import styled from "styled-components";

export default function CheckList({ items, itemName }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    //send data to a reducer to change the state in the search page
  };
  return (
    <CheckBoxForm onSubmit={handleSubmit(onSubmit)}>
      <h2>{itemName}</h2>
      {items.map(item => {
        return (
          <>
            <label for={item}>
              <input type="checkbox" name={item} ref={register} />
              {item}
            </label>
          </>
        );
      })}
    </CheckBoxForm>
  );
}
