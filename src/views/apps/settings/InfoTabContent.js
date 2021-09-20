/*eslint-disable*/
import React, { useState } from "react";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
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

import "@styles/react/libs/flatpickr/flatpickr.scss";

import { onErrorToast, onSuccessToast } from "@src/views/common/Toaster";

import SpinnerComponent from "@src/@core/components/spinner/Fallback-spinner";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
const InfoTabContent = ({ data, onChange, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSave = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().patch(urls.UPDATE_ADMIN_GENERAL_INFO, {
        ...data,
      });
      setIsLoading(false);
      onSuccessToast("Updated!");
    } catch (error) {
      setIsLoading(false);

      onErrorToast(error.data.massage);
    }
  };

  return (
    <Form>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="bio">About Us</Label>
            <Input
              type="textarea"
              name="about_us"
              defaultValue={data.about_us || ""}
              value={data.about_us}
              placeholder="Your Address  here..."
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <Label for="bio">Address</Label>
            <Input
              type="textarea"
              name="address"
              defaultValue={data.address || ""}
              value={data.address}
              placeholder="Your Address  here..."
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={data.email || ""}
              value={data.email}
              onChange={onChange}
              //  onChange={e => setValue("email", e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="phone">Contact</Label>
            <Input
              id="phone"
              name="contact_no"
              value={data.contact_no}
              defaultValue={data.contact_no || ""}
              placeholder="Phone Number"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <Label for="phone">Schedule</Label>
            <Input
              id="schedule"
              name="schedule"
              defaultValue={data.schedule || ""}
              placeholder="Schedule"
              value={data.schedule}
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col className="mt-1" sm="12">
          <Button.Ripple
            className="mr-1"
            color="primary"
            onClick={isLoading ? null : onSave}
          >
            {isLoading && <Spinner size="sm" color="white" />} Save changes
          </Button.Ripple>
          <Button.Ripple color="secondary" outline onClick={onCancel}>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  );
};

export default InfoTabContent;
