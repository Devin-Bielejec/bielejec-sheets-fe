import React from "react";
import styled from "styled-components";

const StyledSelect = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Select({
  name,
  options,
  handleChange,
  selectedOption,
}) {
  return (
    <StyledSelect>
      <label htmlFor={name}>{name}</label>

      <select name={name} onChange={handleChange}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
}