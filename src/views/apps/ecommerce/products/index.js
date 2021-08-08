/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "@urls";
import Breadcrumbs from "@components/breadcrumbs";
import ProductTable from "./ProductTable";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const res = await axios.get(urls.GET_PRODUCTS);
      console.log(res.data.data.products);
      setProducts(res.data.data.products);
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
      <ProductTable products={products}/>
    </Fragment>
  );
}
