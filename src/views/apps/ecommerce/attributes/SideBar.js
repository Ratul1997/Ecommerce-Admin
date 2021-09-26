/* eslint-disable  */
// ** React Import
import { useState, useEffect } from "react";

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
  Spinner,
} from "reactstrap";

import { toast } from "react-toastify";

import axios from "axios";
import { urls } from "@urls";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../../common/Toaster";
import axiosInstance from "../../../../configs/axiosInstance";
import attributeServices from "../../../../services/attributeServices";
const SideBarNewAttribute = ({ open, toggleSidebar, onAddAttribute }) => {
  const initialState = {
    attribute_name: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  // ** States
  const [attributeData, setAttributeData] = useState(initialState);

  useEffect(() => {
    return () => {
      setAttributeData(initialState);
    };
  }, []);

  const { register, errors, handleSubmit } = useForm();

  const postData = async () => {
    setIsLoading(true);
    try {
      const res = await attributeServices.addAttribute({
        attribute_name: attributeData.attribute_name.trim(),
      });

      onAddAttribute({
        ...res.data.results,
        options: [],
      });
      toggleSidebar();
      onSuccessToast("Successfully Inserted An Attribute");
    } catch (error) {
      onErrorToast(error.data.massage);
    }
    setIsLoading(false);
  };

  // ** Function to handle form submit
  const onSubmit = () => {
    if (isObjEmpty(errors) && !isLoading) {
      // toggleSidebar();
      postData();
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Attribute"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="attribute-name">
            Attribute Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="attribute-name"
            id="attribute-name"
            placeholder="Size/Color..."
            innerRef={register({ required: true })}
            onChange={e =>
              setAttributeData({
                ...attributeData,
                attribute_name: e.target.value,
              })
            }
            className={classnames({ "is-invalid": errors["attribute-name"] })}
          />
        </FormGroup>

        <Button
          type="submit"
          className="mr-1"
          color="primary"
          onClick={onSubmit}
        >
          {isLoading && <Spinner color="white" size="sm" />}
          Submit
        </Button>
        <Button
          type="reset"
          color="secondary"
          outline
          onClick={!isLoading ? toggleSidebar : null}
        >
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SideBarNewAttribute;
