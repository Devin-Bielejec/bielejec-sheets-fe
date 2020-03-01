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
  Text
} from "./Styles";

export default function CreateDocument({ state, dispatch }) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  let history = useHistory();
  console.log("createDocument", state);
  const onSubmit = data => {
    setIsDownloading(true);
    console.log("createDocument data", data);
    axiosWithAuth()
      .post(
        "/questions/createDocument",
        {
          nameOfDoc: data.title,
          ids: state.document.questions.map(item => item.id)
        },
        {
          responseType: "blob"
        }
      )
      .then(res => {
        console.log(res);
        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(file);
        setDownloadLink(fileURL);
        setIsDownloading(false);
        console.log(fileURL);
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
            Create Document
          </SubmitButton>
          {isDownloading && <p>Downloading in Progress...</p>}
          {downloadLink && (
            <div>
              <a
                href={downloadLink}
                download={"myfile.pdf"}
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
