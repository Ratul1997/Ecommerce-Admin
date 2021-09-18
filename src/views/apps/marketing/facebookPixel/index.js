/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "reactstrap";

import consoleLog from "@console";
import axiosInstance from "../../../../configs/axiosInstance";
import { urls } from "../../../../utility/Urls";
import { onErrorToast, onSuccessToast } from "../../../common/Toaster";

export default function FacebookPixel() {
  const [pixelCode, setPixelCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadPixel();
  }, []);
  const loadPixel = async () => {
    try {
      const res = await axiosInstance().get(urls.FACEBOOK_PIXEL);
      setPixelCode(res.data.description);
    } catch (error) {
      consoleLog(error);
    }
  };

  const uploadPixel = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance().patch(urls.FACEBOOK_PIXEL, {
        description: pixelCode,
      });
      onSuccessToast("Updated");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      onErrorToast("Internal Server Error");
      consoleLog(error);
    }
  };
  return (
    <Form>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="bio">Facebook Pixel</Label>
            <Input
              type="textarea"
              placeholder=""
              rows={10}
              value={pixelCode}
              onChange={e => setPixelCode(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" onClick={isLoading ? null : uploadPixel}>
        {isLoading && <Spinner color="white" size="sm" />} Save
      </Button>
    </Form>
  );
}
