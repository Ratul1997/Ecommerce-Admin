/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "@urls";
import Breadcrumbs from "@components/breadcrumbs";
import ProductTable from "./ProductTable";
export default function Products() {
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const res = await axios.get(urls.GET_PRODUCTS + `?page=${1}&limit=${1}`);
      console.log(res);
    } catch (error) {
      console.log(error);
      alert(error.msg);
    }
  };
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Products"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Products"
      />
      <ProductTable />
    </Fragment>
  );
}
