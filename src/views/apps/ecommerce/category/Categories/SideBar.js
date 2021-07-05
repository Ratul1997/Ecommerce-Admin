/* eslint-disable semi */
// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
import { useDispatch } from "react-redux";
import TextareaCounter from "@src/views/forms/form-elements/textarea/TextareaCounter";

const SidebarNewCategory = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState("subscriber");
  const [parentCategory, setParentCategory] = useState("basic");
  const [description, setDescription] = useState("");

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit } = useForm();

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Category"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="category-name">
            Category Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="category-name"
            id="category-name"
            placeholder="Bag/Watch..."
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["category-name"] })}
          />
        </FormGroup>
        <FormGroup
          className="mb-2"
          value={parentCategory}
          onChange={e => setParentCategory(e.target.value)}
        >
          <Label for="select-parentCategory">Parent Category</Label>
          <Input
            type="select"
            id="select-parentCategory"
            name="select-parentCategory"
          >
            <option value="basic">Basic</option>
            <option value="enterprise">Enterprise</option>
            <option value="company">Company</option>
            <option value="team">Team</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="category-name">Description</Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            rows="3"
            value={description}
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          />
          <span
            className={classnames("textarea-counter-value float-right", {
              "bg-danger": description.length > 20
            })}
          >
            {`${description.length}/20`}
          </span>
        </FormGroup>
        <Button type="submit" className="mr-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewCategory;
