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
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import productServices from "../../../../services/productServices";

export default function Category() {
  const store = useSelector(store => store.ecommerce);
  const dispatch = useDispatch();
  const [isOnline, setisOnline] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const load = async () => {
    setIsLoading(true);
    try {
      const url = urls.GET_CATEGORIES;

      // console.log(url)
      const res = await productServices.getAllCategories();
      dispatch(addCategories(res.data.data));
    } catch (err) {
      onErrorToast(err.data.massage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [dispatch]);

  if (isLoading) return <SpinnerComponent />;
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
