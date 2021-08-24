/* eslint-disable  */
// ** React Import
import { Fragment, useState, useEffect } from "react";

import Select, { components } from "react-select";
// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Col,
  Spinner,
} from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { addCategories, updateCategories } from "../../store/actions";
import { urls } from "@urls";

import { toast } from "react-toastify";
import axiosInstance from "../../../../../configs/axiosInstance";
import { onErrorToast, onSuccessToast } from "../../../../common/Toaster";

import { selectThemeColors } from "@utils";

const options = [
  {
    value: 1,
    label: "On hold",
  },
  {
    value: 2,
    label: "Processing",
  },
  {
    value: 3,
    label: "Completed",
  },
  {
    value: 4,
    label: "Cancelled",
  },
  {
    value: 5,
    label: "Refunded",
  },
  {
    value: 6,
    label: "Failed",
  },
  {
    value: 7,
    label: "Pending Payment",
  },
];
const SideBarImage = ({
  open,
  toggleSidebar,
  data,
  onUpdate,
  isLoading,
  onDelete,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    options.filter(item => item.label === data.status)[0]
  );
  return (
    <Sidebar
      size="lg"
      open={open}
      title={data.product_name}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <FormGroup row>
        <Col>
          <Label for="Name">User Email:</Label>
        </Col>
        <Col>
          <h3>{data.user_email}</h3>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="Name">Product Name:</Label>
        <Input
          type="text"
          id="Name"
          name="productName"
          placeholder="iphone 12 pro max"
          disabled
          value={data.product_name}
        />
      </FormGroup>
      <FormGroup>
        <Label className="form-label" for="task-assignee">
          Type
        </Label>
        <Input
          type="text"
          id="Name"
          name="productName"
          placeholder="iphone 12 pro max"
          disabled
          value={data.product_type}
        />
      </FormGroup>
      <FormGroup>
        <Label for="brand">Brand:</Label>
        <Input
          type="text"
          id="brand"
          placeholder="Apple"
          name="brand"
          disabled
          value={data.product_brand}
        />
      </FormGroup>

      <FormGroup>
        <Label for="productDetails">Product Details:</Label>
        <Input
          type="textarea"
          id="productDetails"
          name="productDetails"
          placeholder="Some information about product"
          disabled
          value={data.product_details}
        />
      </FormGroup>
      <FormGroup>
        <Label for="qty">Quantity:</Label>

        <Input
          type="number"
          id="productDetails"
          name="productDetails"
          placeholder="Some information about product"
          disabled
          value={data.qty}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumber">Phone Number:</Label>
        <Input
          type="number"
          id="phoneNumber"
          placeholder="017000000000"
          name="phoneNumber"
          disabled
          value={data.user_phoneNumber}
        />
      </FormGroup>

      <FormGroup>
        <Label for="stock_status">Order status</Label>
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          options={options}
          value={selectedOption}
          onChange={data => setSelectedOption(data)}
        />
      </FormGroup>

      <Fragment>
        {isLoading ? (
          <Button color="primary">
            {" "}
            <Spinner size="sm" /> Loading...
          </Button>
        ) : (
          <>
            <Button
              className="mr-1"
              color="primary"
              onClick={onUpdate(selectedOption.label)}
            >
              Update
            </Button>
            <Button.Ripple
              color="secondary"
              type="reset"
              onClick={onDelete}
              outline
            >
              Delete
            </Button.Ripple>
          </>
        )}
      </Fragment>
    </Sidebar>
  );
};

export default SideBarImage;
