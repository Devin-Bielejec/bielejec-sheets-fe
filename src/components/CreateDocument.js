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
import { connect } from "react-redux";
import { createDocument } from "../actions/createDocument";

function CreateDocument({
  documentQuestions,
  downloadName,
  downloadLink,
  createDocument,
  isFetching,
}) {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
  });

  let history = useHistory();

  const onSubmit = (data) => {
    //when we send to backend, we have to send only kwargs that are selected
    let newDocument = {
      nameOfDoc: data.nameOfDoc,
      spacingBetween: data.spacingBetween + "in",
      collatedAnswerKey: data.collatedAnswerKey,
      columns: parseInt(data.columns),
      numberOfVersions: parseInt(data.numberOfVersions),
      questions: [...documentQuestions],
    };

    console.log(newDocument);
    createDocument({ document: newDocument, username: "testingUserName" });
  };
  console.log(downloadLink, downloadName);
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
            defaultValue={1}
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
          {isFetching && <p>Downloading in Progress...</p>}
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

const mapStateToProps = (state) => {
  return {
    documentQuestions: state.document.questions,
    downloadName: state.document.downloadName,
    downloadLink: state.document.downloadLink,
    isFetching: state.isFetching,
  };
};
export default connect(mapStateToProps, {
  createDocument,
})(CreateDocument);
