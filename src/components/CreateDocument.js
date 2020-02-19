import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { baseURL, axiosWithAuth } from "../utils/index";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
  StyledLink,
  Text
} from "./Styles";

export default function Login() {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  let history = useHistory();

  const onSubmit = data => {
    const username = data.username;
    const password = data.password;

    axiosWithAuth()
      .post(`${baseURL}/createDocument`, {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.key);
        history.push("/search");
      })
      .catch(err => console.log(err));
  };

  return (
    <Flex justifyContent="center">
      <Background>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Document</h2>
          <StyledInput
            name="title"
            placeholder="Title For Document"
            ref={register({ required: true })}
          />
          {errors.title && <Warning>This field is required</Warning>}

          <StyledInput
            name="numberOfVersions"
            placeholder="Number of Versions"
            type="number"
            defaultValue="1"
            ref={register({ required: true, min: 1 })}
          />
          {errors.numberOfVersions && <Warning>This field is required</Warning>}

          <SubmitButton type="submit" disabled={!formState.isValid}>
            Download
          </SubmitButton>
        </Form>
      </Background>
    </Flex>
  );
}
