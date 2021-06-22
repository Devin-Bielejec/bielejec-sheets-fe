import React, { useState } from "react";
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
  Text,
} from "./Styles";

export default function CreateDocument({ state, dispatch }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
  });
  const [downloadName, setDownloadName] = useState("");

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  let history = useHistory();
  console.log("createDocument state", state);
  const onSubmit = (data) => {
    setIsDownloading(true);
    console.log("createDocument data", state);
    //when we send to backend, we have to send only kwargs that are selected
    let newDocument = { questions: [] };
    state.document.questions.forEach((question) => {
      let newQuestion = { id: question.id };
      let newKwargs = {};

      //loop through kwargs and add only if selected
      Object.keys(question.kwargs).forEach((kwarg) => {
        //now loop through options
        Object.keys(question.kwargs[kwarg]).forEach((option) => {
          if (question.kwargs[kwarg][option].selected) {
            //check if option is a number
            if (isNaN(option)) {
              newKwargs[kwarg] = option;
            } else {
              newKwargs[kwarg] = parseInt(option);
            }
          }
        });
      });
      newQuestion.kwargs = newKwargs;
      newDocument.questions.push(newQuestion);
    });

    axiosWithAuth()
      .post("/createDocument", {
        data: {
          nameOfDoc: data.title,
          numberOfVersions: data.numberOfVersions,
          document: newDocument,
          username: "testingUserName",
        },
      })
      .then((res) => {
        console.log(res);

        setDownloadName(data.title);
        setDownloadLink(
          `http://localhost:5000/getFile/testingUserID/${data.title}`
        );
        setIsDownloading(false);
      })
      .catch((err) => console.log(err));
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
            Create Document
          </SubmitButton>
          {isDownloading && <p>Downloading in Progress...</p>}
          {downloadLink && (
            <div>
              <a
                href={downloadLink}
                download={downloadName}
                rel="noreferrer noopener"
              >
                Download!
              </a>
            </div>
          )}
        </Form>
      </Background>
    </Flex>
  );
}
