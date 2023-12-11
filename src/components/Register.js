import React from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utils/index";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
} from "./Styles";
import { connect } from "react-redux";
import { registerUser } from "../actions/register.js";

function Register({ registerUser, ...rest }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
  });

  const history = useHistory();
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    const response = await registerUser({ email, password });

    if (response) {
      history.push("/search");
    }
  };

  return (
    <Flex justifyContent="center">
      <Background>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <StyledInput
            placeholder="Email"
            name="email"
            ref={register({ required: true, minLength: 4 })}
          />
          {errors.email && <Warning>This field is required</Warning>}

          <StyledInput
            placeholder="Password"
            name="password"
            type="password"
            ref={register({ required: true, minLength: 9 })}
          />
          {errors.email && <Warning>This field is required</Warning>}

          <SubmitButton type="submit" disabled={!formState.isValid}>
            Register
          </SubmitButton>
        </Form>
      </Background>
    </Flex>
  );
}

export default connect(null, { registerUser })(Register);
