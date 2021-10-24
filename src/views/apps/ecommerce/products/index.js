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
import consoleLog from '@console'
import productServices from "../../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from '../store/actions';

export default function Products() {
  const dispatch = useDispatch()
  
  const store = useSelector(store => store.ecommerce);
    
  const [products, setProducts] = useState(store.products);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const res = await productServices.getAllProducts();
      setProducts(res.data.products);
      dispatch(addProducts(res.data.products));

      
      consoleLog(res.data.products)
      
    } catch (error) {
      onErrorToast(error.data.massage);
      // alert(error);
    }finally{

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
