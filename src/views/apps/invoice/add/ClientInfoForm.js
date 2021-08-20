/*eslint-disable*/
import { Fragment, useState, useEffect, useMemo } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Repeater from "@components/repeater";

// ** Third Party Components
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash } from "react-feather";
import Select, { components } from "react-select";
import { selectThemeColors } from "@utils";
import { urls } from "@urls";
import { generateId } from "@utils";
import axiosInstance from "@configs/axiosInstance.js";

import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";

export default function ClientInfoForm({
  customerInfo,
  setCustomerInfo,
  setOpen,
  onChange,
  countryOptions,
  countryCode,
  onAdd,
}) {
  return (
    <Form>
      <FormGroup>
        <Label for="customer-name" className="form-label">
          Customer Name
        </Label>
        <Input
          id="customer-name"
          placeholder="John Doe"
          name="customer_name"
          value={customerInfo.customer_name}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="customer-email" className="form-label">
          Customer Email
        </Label>
        <Input
          type="email"
          id="customer-email"
          placeholder="example@domain.com"
          name="customer_email"
          value={customerInfo.customer_email}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="customer-address" className="form-label">
          Customer Address
        </Label>
        <Input
          type="textarea"
          cols="2"
          rows="2"
          id="customer-address"
          name="customer_address"
          value={customerInfo.customer_address}
          placeholder="1307 Lady Bug Drive New York"
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="country" className="form-label">
          Country
        </Label>
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          options={countryOptions}
          onChange={data =>
            setCustomerInfo({ ...customerInfo, customer_country: data })
          }
          isClearable={false}
          value={customerInfo.customer_country}
        />
      </FormGroup>
      <FormGroup>
        <Label for="customer-contact" className="form-label">
          Contact
        </Label>
        <Row>
          <Col sm="3">
            <Input type="number" value={countryCode} disabled />
          </Col>
          <Col sm="8">
            <Input
              type="number"
              id="customer-contact"
              placeholder="763-242-9206"
              name="customer_contact"
              value={customerInfo.customer_contact}
              onChange={onChange}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup className="d-flex flex-wrap mt-2">
        <Button className="mr-1" color="primary" onClick={onAdd}>
          Add
        </Button>
        <Button color="secondary" onClick={() => setOpen(false)} outline>
          Cancel
        </Button>
      </FormGroup>
    </Form>
  );
}
