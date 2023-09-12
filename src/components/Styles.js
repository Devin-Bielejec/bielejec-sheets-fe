import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Flex = styled.div`
  display: flex;
  width: ${({ width }) => width || ""};
  margin: ${({ margin }) => margin || "0px"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  user-select: ${({ userSelect }) => userSelect || ""};
`;

export const Background = styled.div`
  max-width: 400px;
  padding: 3em 6em;
  background-color: ${({ backgroundColor }) => backgroundColor || "#fcfbfa"};
  border: ${({ border }) => border || ""};
  margin-top: 4em;
  box-shadow: 8px 6px 10px rgba(0, 0, 0, 0.3);
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

export const CheckBoxForm = styled.form`
  display: flex;
  flex-flow: column wrap;
`;

export const Button = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor || "#4e4eb2"};
  color: ${({ color }) => color || "#fcfbfa"};

  border: 1px solid #4e4eb2;
  box-shadow: none;
  padding: 0.75em 2em;
  font-size: 1rem;
  border-radius: 0;
  opacity: 1;
  width: 100%;

  margin: ${({ margin }) => margin || "0.75em 0em 0em 0em"};
  text-align: center;

  transition: 0.25s opacity cubic-bezier(0.98, 0.26, 0.52, 0.96);
  &:hover {
    cursor: pointer;
  }
`;

export const CheckBox = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor || "#4e4eb2"};
  color: ${({ color }) => color || "#fcfbfa"};

  border: 1px solid #4e4eb2;
  box-shadow: none;
  padding: 0.75em 2em;
  font-size: 1rem;
  border-radius: 0;
  opacity: 1;
  width: 100%;

  margin: ${({ margin }) => margin || "0.75em 0em 0em 0em"};
  text-align: center;

  transition: 0.25s opacity cubic-bezier(0.98, 0.26, 0.52, 0.96);
  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.color};
      color: white;
      opacity: 1;
      &:hover {
        cursor: pointer;
      }
    `}
`;
export const SubmitButton = styled(Button)`
  width: 100%;
  opacity: 0.5;
  background-color: #4e4eb2;
  &:hover {
    cursor: default;
  }
  ${(props) =>
    !props.disabled &&
    css`
      background-color: #4e4eb2;
      opacity: 1;
      &:hover {
        cursor: pointer;
      }
    `}
`;

export const StyledInput = styled.input`
  width: 100%;
  margin: 0.8em 0;
  font-family: "Play", sans-serif;
  padding: 0.75em 3em 0.75em 0.5em;
  background-color: #eee;
  font-size: 0.8em;
  border: 0;
`;

export const Warning = styled.p`
  margin-top: 0;
  margin-bottom: 1em;
  font-size: 0.9em;
`;

export const StyledLink = styled(Link)`
  color: #4e4eb2;
`;

export const Text = styled.p`
  font-size: ${({ fontSize }) => fontSize || "1rem"};
`;

export const Image = styled.img`
  width: 100%;
  height: 3vw;
  object-fit: contain;
`;
