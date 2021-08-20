/* eslint-disable */
import React, { useEffect, useState } from "react";

import { Card, CardBody, Row, Col, CustomInput, Button } from "reactstrap";
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance.js";

// ** Store & Actions
import { useSelector } from "react-redux";
import { onErrorToast } from "../../../common/Toaster";

export default function ProductCategories() {
  const store = useSelector(store => store.ecommerce);
  const { categories } = store;
  const [categoryList, setCategoryList] = useState(categories);
  useEffect(() => {
    if (categoryList.length === 0) {
      loadCategories();
    }
  }, []);

  const loadCategories = async () => {
    try {
      const url = urls.GET_CATEGORIES;
      const res = await axiosInstance().get(url);
      setCategoryList(res.data.data);
    } catch (err) {
      onErrorToast(err.data.massage);
    }
  };
  return (
    <>
      <h6 className="filter-title">Categories</h6>
      <ul className="list-unstyled categories-list">
        <li>
          <CustomInput
            type="radio"
            id={-1}
            label="All"
            name="category-radio"
            defaultChecked={true}
          />
        </li>
        {categories.map(category => {
          return (
            <li key={category.category_id}>
              <CustomInput
                type="radio"
                id={category.category_id}
                label={category.name}
                name="category-radio"
                defaultChecked={category.defaultChecked}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
