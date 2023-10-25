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
  return (
    <Flex margin="20px" justifyContent="center">
      <Background>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        ></Flex>
      </Background>
    </Flex>
  );
}
