// ** React Imports
/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import Pdf from "react-to-pdf";
import {
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  CardText,
  Spinner,
} from "reactstrap";

import { selectThemeColors } from "@utils";
import Select from "react-select";

const PreviewActions = ({
  id,
  data,
  selectedOption,
  setSelectedOption,
  options,
  onUpdate,
  isLoading,
  
}) => {
  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
        <Label for="stock_status">Order status</Label>
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          options={options}
          value={selectedOption}
          onChange={data => setSelectedOption(data)}
        />

        <Label for="stock_status" className="mt-1">
          Customer Profile:
        </Label>
        <h6 className="mb-25">Name: {data.first_name || ""}</h6>
        <CardText className="mb-25">Email: {data.email || ""}</CardText>

        <Button.Ripple
          color="primary"
          block
          className="mb-75 mt-1"
          onClick={isLoading ? null : onUpdate}
        >
          {isLoading && <Spinner size="sm" />} Update
        </Button.Ripple>

        {/* <Button.Ripple
          color="secondary"
          tag={Link}
          to="/apps/invoice/print"
          target="_blank"
          block
          outline
          className="mb-75"
        >
          Print
        </Button.Ripple>
        <Button.Ripple
          tag={Link}
          to={`/apps/invoice/edit/${id}`}
          color="secondary"
          block
          outline
          className="mb-75"
        >
          Edit
        </Button.Ripple>
        <Button.Ripple
          color="success"
          block
          onClick={() => setAddPaymentOpen(true)}
        >
          Add Payment
        </Button.Ripple> */}
      </CardBody>
    </Card>
  );
};

export default PreviewActions;
