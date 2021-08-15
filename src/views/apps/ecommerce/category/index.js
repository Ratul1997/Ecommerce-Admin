/* eslint-disable  */
import React, { useState, useEffect, Fragment } from "react";
import AddCategory from "./AddCategory";
import Categories from "./Categories";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCategories } from "../store/actions";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";
import DataTableWithButtons from "../../../tables/data-tables/basic/TableExpandable";
import { urls } from "@urls";
import axiosInstance from "../../../../configs/axiosInstance";
import { onErrorToast } from "../../../common/Toaster";

export default function Category() {
  const store = useSelector(store => store.ecommerce);
  const dispatch = useDispatch();
  const [isOnline, setisOnline] = useState(null);
  const load = async () => {
    try {
      const url = urls.GET_CATEGORIES;
      const res = await axiosInstance().get(url);
      dispatch(addCategories(res.data.data));
    } catch (err) {
      onErrorToast(err.data.massage);
    }
  };

  useEffect(() => {
    load();
  }, [dispatch]);
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Categories />
        </Col>
      </Row>
    </Fragment>
  );
}
