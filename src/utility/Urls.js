/* eslint-disable */

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const urls = {
  GET_CATEGORIES: `${BASE_URL}api/categories`,
  REMOVE_A_CATEGORY: `${BASE_URL}api/remove-a-category`,
  ADD_A_CATEGORY: `${BASE_URL}api/add-category`,
  UPLOAD_A_FILE: `api/file-upload`,
  ADD_A_PRODUCT: `${BASE_URL}api/add-product`,
  GET_PRODUCTS: `${BASE_URL}api/get-products`,
  GET_FEATURED_PRODUCTS: `${BASE_URL}api/get-featured-product`,
  GET_POPULAR_PRODUCTS: `${BASE_URL}api/get-popular-product`
};
