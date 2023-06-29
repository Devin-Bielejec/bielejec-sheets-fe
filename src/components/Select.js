import React from "react";
import styled from "styled-components";

const selectBorder = "#777";
const selectFocus = "blue";
const selectArrow = "#777";

const StyledSelectContainer = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &:after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: ${selectArrow};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  display: grid;
  grid-template-areas: "select";
  align-items: center;
`;

const StyledSelect = styled.select`
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;

  // Additional resets for further consistency
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;

  grid-area: select;

  &:focus-within {
    border: 2px solid ${selectFocus};
    border-radius: inherit;
  }
`;

export default function Select({
  name,
  options,
  handleChange,
  selectedOption,
}) {
  return (
    <div>
      <label htmlFor={name}>
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
      </label>
      <StyledSelectContainer>
        <StyledSelect name={name} onChange={handleChange}>
          {options.map((value) => (
            <option
              key={value}
              value={value}
              selected={value === selectedOption}
            >
              {value}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectContainer>
    </div>
  );
}
