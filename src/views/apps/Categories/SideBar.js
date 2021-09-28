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

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import TextareaCounter from "@src/views/forms/form-elements/textarea/TextareaCounter";
import axios from "axios";
import { updateBlogCategories } from "../../apps/blog/store/actions";
import { updateCategories } from "../../apps/ecommerce/store/actions";
import { urls } from "@urls";

import { toast } from "react-toastify";
import {
  ErrorToast,
  onErrorToast,
  onSuccessToast,
  SuccessToast,
} from "../../common/Toaster";
import blogServices from "../../../services/blogServices";


const SidebarNewCategory = ({
  open,
  toggleSidebar,
  selectedCategory,
  getParentCategory,
  services,
  prevPath,
  categories
}) => {
  const initialState = {
    name: "",
    description: "",
    parent_id: null,
  };

  // ** States

  const [parentCategory, setParentCategory] = useState("");
  const [categoryData, setCategoryData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryData({
        name: selectedCategory.name,
        description: selectedCategory.description,
        parent_id: selectedCategory.parent_id
          ? {
              value: selectedCategory.parent_id,
              label: getParentCategory(selectedCategory.parent_id),
            }
          : null,
      });
      setIsEdit(true);
    }
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      setCategoryData(initialState);
    };
  }, []);

  const dispatch = useDispatch();

  const update_category_action = prevPath === "/apps/ecommerce/category" ? updateCategories : updateBlogCategories;

  const getOptions = () => {
    const options = [];
    categories &&
      categories.map(item => {
        options.push({ value: item.category_id, label: item.name });
      });
    return options;
  };
  // ** Vars
  const categoryOptions = [
    {
      label: "Categories",
      options: getOptions(),
    },
  ];
  const { register, errors, handleSubmit } = useForm();

  const postData = async () => {
    const category = {
      ...categoryData,
      parent_id: categoryData.parent_id ? categoryData.parent_id.value : null,
    };
    try {
      const res = await services.addCategory({
        categoryData: category,
      });
      dispatch(update_category_action(res.data));
      onSuccessToast("Successfully added.");
      toggleSidebar();
    } catch (error) {
      onErrorToast(error.data.massage);
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

  const onEdit = async e => {
    e.preventDefault();
    const category = {
      ...categoryData,
      parent_id: categoryData.parent_id.value,
    };
    try {
      const res = await services.updateCategoryById(
        selectedCategory.category_id,
        {
          categoryData: category,
        }
      );
      onSuccessToast("Successfully Updated.");
      toggleSidebar();
      window.location.reload();
    } catch (error) {
      onErrorToast(error.data.massage);
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={isEdit ? "Edit" : "New Category"}
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
            value={categoryData.name}
            onChange={e =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
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
            options={categoryOptions}
            className="react-select"
            classNamePrefix="select"
            value={categoryData.parent_id}
            onChange={e => setCategoryData({ ...categoryData, parent_id: e })}
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
            onChange={e =>
              setCategoryData({ ...categoryData, description: e.target.value })
            }
          />
          <span
            className={classnames("textarea-counter-value float-right", {
              "bg-danger": categoryData.description.length > 100,
            })}
          >
            {`${categoryData.description.length}/100`}
          </span>
        </FormGroup>
        {isEdit ? (
          <>
            <Button
              type="submit"
              className="mr-1"
              color="primary"
              onClick={onEdit}
            >
              Update
            </Button>

            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                setCategoryData(initialState);
                setIsEdit(false);
                toggleSidebar();
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button
              type="submit"
              className="mr-1"
              color="primary"
              onClick={onSubmit}
            >
              Submit
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                setCategoryData(initialState);
                setIsEdit(false);
                toggleSidebar();
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </Form>
    </Sidebar>
  );
};

export default SidebarNewCategory;
