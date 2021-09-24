/*eslint-disable*/
import React, { useState } from "react";
import {
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

import htmlToDraft from "html-to-draftjs";

import "@styles/react/libs/editor/editor.scss";

import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import { urls } from "@urls";
import axiosInstance from "@src/configs/axiosInstance";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";
import priceTagServices from "../../../../../services/priceTagServices";
export default function GenerateTag() {
  const initialContent = "";
  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  const [tagInput, setInput] = useState(editorState);
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSave = () => {
    const tags = stateToHTML(tagInput.getCurrentContent());

    onUpload(tags);
  };
  const onUpload = async tags => {
    setIsLoading(true);
    try {
      const res = await priceTagServices.addPriceTagTemplate({
        tag_name: tagName.trim(),
        tag_descriptions: tags,
      });
      onSuccessToast("Success!");
    } catch (error) {
      onErrorToast(
        error.data.massage !== undefined || error.data.massage
          ? error.data.massage
          : error.toString()
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
      <Button color="primary" onClick={onSave}>
        {isLoading && <Spinner size="sm" />}
        Save
      </Button>
    </Card>
  );
}
