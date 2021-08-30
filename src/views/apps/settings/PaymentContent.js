/*eslint-disable*/
import React, { useState } from "react";

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

import classnames from "classnames";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { Eye, EyeOff } from "react-feather";
import { onErrorToast, onSuccessToast } from "@src/views/common/Toaster";

import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";
export default function PaymentContent({
  data,
  onChange,
  onCancel,
  changeStatus,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const onSave = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance().patch(urls.UPDATE_ADMIN_PAYMENT_INFO, {
        paymentDetails: data,
      });
      onSuccessToast("Updated!");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onErrorToast(error.data.massage);
    }
  };
  return (
    <Form>
      <Row>
        {data.map((item, key) => {
          return (
            <Col sm="6" key={key}>
              <FormGroup>
                <Label for="bio">{item.payment_name}</Label>
                <Input
                  id="payment_number"
                  name="payment_number"
                  type="number"
                  defaultValue={item.payment_number || ""}
                  value={item.payment_number}
                  onChange={onChange(item.payment_id)}
                  placeholder="Number"
                />
              </FormGroup>
            </Col>
          );
        })}

        <Col sm="12">
          <h3>Active Status</h3>
          {data.map((item, key) => {
            return (
              <Row key={key}>
                <Col>
                  <p>{item.payment_name}</p>
                </Col>
                <Col>
                  {item.status === 0 ? (
                    <Eye
                      size="18"
                      color="red"
                      onClick={changeStatus(item.payment_id)}
                    />
                  ) : (
                    <EyeOff
                      size="18"
                      color="green"
                      onClick={changeStatus(item.payment_id)}
                    />
                  )}
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col className="mt-1" sm="12">
          <Button.Ripple
            className="mr-1"
            color="primary"
            onClick={isLoading ? null : onSave}
          >
            {isLoading && <Spinner size="sm" color="white" />}Save changes
          </Button.Ripple>
          <Button.Ripple color="secondary" outline onClick={onCancel}>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  );
}
