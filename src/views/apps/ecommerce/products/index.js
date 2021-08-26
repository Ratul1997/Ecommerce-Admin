/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "@urls";
import Breadcrumbs from "@components/breadcrumbs";
import ProductTable from "./ProductTable";
import axiosInstance from "../../../../configs/axiosInstance";
import { onErrorToast } from "../../../common/Toaster";
import { findItemInArray, findValueInArray } from "../../../../utility/Utils";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_PRODUCTS);
      setProducts(res.data.products);
    } catch (error) {
      onErrorToast(error.data.massage);
      // alert(error);
    }
  };
  const updatePopular = (id, type) => {
    const productList = products;
    if (type === "Popular") {
      const index = findValueInArray(productList, id, "product_id");
      productList[index].popular_product = !productList[index].popular_product;
    }else{

      const index = findValueInArray(productList, id, "product_id");
      productList[index].featured_product = !productList[index].featured_product;
    }
    setProducts([...productList]);
  };
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Products"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Products"
      />
      <ProductTable products={products} updatePopular={updatePopular} />
    </Fragment>
  );
}
