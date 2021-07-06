/* eslint-disable semi */
// ** React Import
import { useState } from "react";

import Select, { components } from "react-select";
// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import TextareaCounter from "@src/views/forms/form-elements/textarea/TextareaCounter";
import axios from "axios";
import { addCategories, updateCategories } from "../../store/actions";

const SidebarNewCategory = ({ open, toggleSidebar }) => {
  const initialState = {
    name: "",
    description: "",
    parent_id: null
  };

  // ** States
  const [parentCategory, setParentCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categoryData, setCategoryData] = useState(initialState);

  // ** Store Vars

  const store = useSelector(store => store.ecommerce);
  const dispatch = useDispatch();
  const { categories } = store;

  const getOptions = () => {
    const options = [];
    categories.map(item => { options.push({ value: item.category_id, label: item.name }); });
    return options
  };
  // ** Vars
  const iconOptions = [
    {
      label: "Categories",
      options: getOptions()
    }
  ];
  const { register, errors, handleSubmit } = useForm();

  const postData = async () => {
    const formData = new FormData();
    formData.append("data", categoryData);
    try {
      const res = await axios.post("http://localhost:5000/api/add-category", {
        categoryData
      });
      dispatch(updateCategories(res.data))
      toggleSidebar()
    } catch (error) {
      console.log(error);
    }
  };

  // ** Function to handle form submit
  const onSubmit = e => {
    e.preventDefault()
    if (isObjEmpty(errors)) {
      // toggleSidebar();
      postData();
    }
  };
  const handleInputChange = e => {
    e.preventDefault()

    console.log(e.value)
    // return val
  }
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
            onChange={e => setCategoryData({ ...categoryData, name: e.target.value })}
            className={classnames({ "is-invalid": errors["category-name"] })}
          />
        </FormGroup>
        <FormGroup
          className="mb-2"
          value={parentCategory}
          onChange={e => setParentCategory(e.target.value)}
        >
          <Label for="select-parentCategory">Parent Category</Label>
          <Select
            options={iconOptions}
            className="react-select"
            classNamePrefix="select"
            onChange={e => setCategoryData({ ...categoryData, parent_id : e.value }) }
          />
        </FormGroup>
        <FormGroup>
          <Label for="category-name">Description</Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            rows="3"
            value={categoryData.description}
            placeholder="Description"
            onChange={e => setCategoryData({ ...categoryData, description: e.target.value }) }
          />
          <span
            className={classnames("textarea-counter-value float-right", {
              "bg-danger": categoryData.description.length > 100
            })}
          >
            {`${categoryData.description.length}/100`}
          </span>
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

export default SidebarNewCategory;
