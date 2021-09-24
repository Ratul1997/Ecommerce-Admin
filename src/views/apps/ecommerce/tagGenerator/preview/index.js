/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { useParams, Link, useHistory } from "react-router-dom";

import Pdf from "react-to-pdf";
import htmlToDraft from "html-to-draftjs";

import "@styles/react/libs/editor/editor.scss";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import { urls } from "@urls";
import axiosInstance from "@src/configs/axiosInstance";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import SpinnerComponent from "../../../../../@core/components/spinner/Fallback-spinner";
import TagFile from "./TagFile";
import CardFooter from "reactstrap/lib/CardFooter";
import priceTagServices from "../../../../../services/priceTagServices";

const options = {
  orientation: "portrait",
};
export default function GenerateTagPreview() {
  const { id } = useParams();
  const pdfRef = useRef();
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const convertHtmlToState = initialContent => {
    const contentBlock = htmlToDraft(initialContent);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };
  const [tagInput, setInput] = useState(convertHtmlToState(""));

  useEffect(() => {
    loadTag();
  }, []);

  const onGenerate = () => {};
  const loadTag = async () => {
    try {
      const res = await priceTagServices.getPriceTagDetailsById(id);
      const results = res.data.results;
      setTagName(results.tag_name);
      setInput(convertHtmlToState(results.tag_descriptions));
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return !error ? (
    <>
      <Card>
        <CardHeader>
          {/* <CardTitle tag="h4">Write your tag</CardTitle> */}
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Col sm="2">
                <h4>Tag Name:</h4>
              </Col>
              <Col sm="10">
                <Input
                  value={tagName}
                  disabled
                  onChange={e => setTagName(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="2">
                <h4>Tag Format: </h4>
              </Col>
              <Col sm="10">
                <Editor
                  editorState={tagInput}
                  onEditorStateChange={data => setInput(data)}
                />
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <Pdf
          targetRef={pdfRef}
          filename={`Tag-${tagName}`}
          x={0.5}
          y={0.5}
          scale={0.8}
          options={options}
        >
          {({ toPdf }) => (
            <Button.Ripple color="primary" className="mb-75" onClick={toPdf}>
              Generate
            </Button.Ripple>
          )}
        </Pdf>
      </Card>

      <h3>Expected Ouput</h3>
      <TagFile
        tag_descriptions={stateToHTML(tagInput.getCurrentContent())}
        pdfRef={pdfRef}
      />
    </>
  ) : (
    error && (
      <Alert color="danger">
        {error.status === 404 && (
          <>
            <h4 className="alert-heading">Tag not found</h4>
            <div className="alert-body">
              Tag with id: {id} doesn't exist. Check list of all tags:{" "}
              <Link to="/apps/ecommerce/taggenerator/list">Tag List</Link>
            </div>
          </>
        )}
      </Alert>
    )
  );
}
