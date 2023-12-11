import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
  StyledLink,
  Text,
} from "./Styles";
import { login } from "../actions/login.js";
import { connect } from "react-redux";

function Login({ login, ...rest }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
  });

  const history = useHistory();

  const [invalidLogin, setInvalidLogin] = React.useState(false);

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const response = await login({ email, password });

    if (response) {
      history.push("/search");
    } else {
      setInvalidLogin(true);
    }
  };

  return (
    <Flex justifyContent="center">
      <Background>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          {invalidLogin && <p>Invalid Login, please try again!</p>}
          <StyledInput
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
          />
          {errors.email && <Warning>This field is required</Warning>}

          <StyledInput
            name="password"
            placeholder="Password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.email && <Warning>This field is required</Warning>}

          <SubmitButton type="submit" disabled={!formState.isValid}>
            Login
          </SubmitButton>
          <Text fontSize="0.7em">
            Not registered?{" "}
            <StyledLink to="/register">Create an account</StyledLink>
          </Text>
        </Form>
      </Background>
    </Flex>
  );
}

export default connect(null, { login })(Login);
