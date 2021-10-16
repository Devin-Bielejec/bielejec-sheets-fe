import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/index";
import {
  Flex,
  Background,
  Form,
  SubmitButton,
  StyledInput,
  Warning,
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
    let newDocument = {
      nameOfDoc: data.nameOfDoc,
      spacingBetween: data.spacingBetween + "in",
      collatedAnswerKey: data.collatedAnswerKey,
      columns: parseInt(data.columns),
      numberOfVersions: parseInt(data.numberOfVersions),
      questions: [...state.document.questions],
    };

    console.log(newDocument);

    axiosWithAuth()
      .post("/createDocument", {
        data: {
          document: newDocument,
          username: "testingUserName",
        },
      })
      .then((res) => {
        console.log(res);

        setDownloadName(newDocument.nameOfDoc);
        setDownloadLink(
          `http://localhost:5000/getFile/testingUserID/${newDocument.nameOfDoc}`
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
            name="nameOfDoc"
            placeholder="Title For Document"
            ref={register({ required: true })}
          />
          {errors.nameOfDoc && <Warning>This field is required</Warning>}

          <label htmlFor="numberOfVersions">Number of Versions</label>
          <StyledInput
            name="numberOfVersions"
            placeholder="Number of Versions"
            type="number"
            defaultValue={1}
            ref={register({ required: true, min: 1 })}
          />
          {errors.numberOfVersions && <Warning>This field is required</Warning>}

          <label htmlFor="spacingBetween">
            Spacing Between Questions (inches)
          </label>
          <StyledInput
            name="spacingBetween"
            placeholder="Spacing Between Questions"
            type="number"
            defaultValue={0.5}
            ref={register({ required: false, min: 0 })}
          />
          {errors.spacingBetween}

          <label htmlFor="collatedAnswerKey">Collated Answer Keys</label>
          <StyledInput
            name="collatedAnswerKey"
            placeholder="Collated Answer Keys"
            type="checkbox"
            defaultValue={true}
            ref={register({ required: false })}
          />
          {errors.collatedAnswerKey}

          <label htmlFor="columns">Number of Columns</label>
          <StyledInput
            name="columns"
            placeholder="Number of Columns"
            type="number"
            defaultValue={1}
            ref={register({ required: false, min: 1, max: 5 })}
          />
          {errors.columns}

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
