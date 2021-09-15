/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { urls } from "@urls";
import Breadcrumbs from "@components/breadcrumbs";
import ProductTable from "./ProductTable";
import axiosInstance from "../../../../configs/axiosInstance";
import { onErrorToast } from "../../../common/Toaster";
import { findItemInArray, findValueInArray } from "../../../../utility/Utils";
import SpinnerComponent from "../../../../@core/components/spinner/Fallback-spinner";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const res = await axiosInstance().get(urls.GET_PRODUCTS);
      setProducts(res.data.products);
      setIsLoading(false);
    } catch (error) {
      onErrorToast(error.data.massage);
      // alert(error);
      setIsLoading(false);
    }
  };

  const onDeleteProducts = async () => {};
  const updateProductList = (id, type) => {
    const productList = products;
    if (type === "Popular") {
      const index = findValueInArray(productList, id, "product_id");
      productList[index].popular_product =
        productList[index].popular_product === 0 ? 1 : 0;
    } else if (type === "Featured") {
      const index = findValueInArray(productList, id, "product_id");
      productList[index].featured_product =
        !productList[index].featured_product;
    } else if (type === "Deleted") {
      const index = findValueInArray(productList, id, "product_id");
      productList.splice(index, 1);
    }
    setProducts([...productList]);
  };
  if (isLoading) return <SpinnerComponent />;
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Products"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Products"
      />
      <ProductTable products={products} updateProductList={updateProductList} />
    </Fragment>
  );
}
