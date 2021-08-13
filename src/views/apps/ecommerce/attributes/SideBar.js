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
import { Button, FormGroup, Label, FormText, Form, Input } from "reactstrap";

import { toast } from "react-toastify";

import axios from "axios";
import { urls } from "@urls";
import { ErrorToast, SuccessToast } from "../../../common/Toaster";
const SideBarNewAttribute = ({ open, toggleSidebar, onAddAttribute }) => {
  const initialState = {
    attribute_name: "",
  };
  // ** States
  const [attributeData, setAttributeData] = useState(initialState);

  useEffect(() => {
    return () => {
      setAttributeData(initialState);
    };
  }, []);

  const { register, errors, handleSubmit } = useForm();

  const postData = async () => {
    try {
      const res = await axios.post(urls.ADD_ATTRIBUTE, {
        attribute_name: attributeData.attribute_name,
      });

      onAddAttribute({
        ...res.data.results,
        options: [],
      });
      toggleSidebar();

      toast.success(
        <SuccessToast toastText="Successfully Inserted A Product" />,
        { hideProgressBar: true }
      );
    } catch (error) {
      toast.error(<ErrorToast toastText={error.massage} />, {
        hideProgressBar: true,
      });
    }
  };

  // ** Function to handle form submit
  const onSubmit = e => {
    e.preventDefault();
    if (isObjEmpty(errors)) {
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
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SideBarNewAttribute;
