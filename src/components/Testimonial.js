import React from "react";
import styled from "styled-components";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
  StyledLink,
  Text,
  Button,
  Image,
  CheckBox,
} from "./Styles.js";
import NumberInput from "./NumberInput.js";

export default function Testimonial({ text, author, ...rest }) {
  const [showFullText, setShowFullText] = React.useState(false);

  const textChange = () => {
    setShowFullText(true);
  };

  return (
    <Flex margin="20px" justifyContent="center">
      <Background>
        <Flex flexDirection="column" alignItems="center" fontFamily="Georgia">
          {!showFullText && (
            <>
              <p>"{text.slice(0, 200)}..."</p>
              <StyledLink onClick={textChange}>Show More</StyledLink>
            </>
          )}
          {showFullText && <p>"{text}..."</p>}
          <p>-{author}</p>
        </Flex>
      </Background>
    </Flex>
  );
}
