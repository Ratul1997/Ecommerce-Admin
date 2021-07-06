/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import Categories from "./Categories";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCategories } from "../store/actions";

export default function Category() {
  const store = useSelector(store => store.ecommerce);
  const dispatch = useDispatch();

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      
      dispatch(addCategories(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, [dispatch]);

  console.log(store);
  return (
    <div>
      {/* <AddCategory /> */}
      <Categories />
    </div>
  );
}
