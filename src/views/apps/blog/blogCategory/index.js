/* eslint-disable  */
import React, { useState, useEffect, Fragment } from "react";
import Categories from "../../Categories";
import {useLocation} from 'react-router-dom';
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addBlogCategories } from "../store/actions";
import { Row } from "reactstrap";
import Col from "reactstrap/lib/Col";
import DataTableWithButtons from "../../../tables/data-tables/basic/TableExpandable";
import { onErrorToast } from "../../../common/Toaster";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
import blogServices from "../../../../services/blogServices";

export default function Category() {

  const store = useSelector(store => store.ecommerce);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const load = async () => {
    setIsLoading(true);
    try {
      // console.log(url)
      const res = await blogServices.getAllCategories();
      dispatch(addBlogCategories(res.data.data));
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
