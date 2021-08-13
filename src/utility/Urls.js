/* eslint-disable */

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const urls = {
	GET_CATEGORIES: `${BASE_URL}api/categories`,
	GET_ATTRIBUTES: `${BASE_URL}api/attributes`,
	REMOVE_ATTRIBUTES: `${BASE_URL}api/attributes/`,
	ADD_ATTRIBUTE: `${BASE_URL}api/attribute`,
	ADD_OPTION: `${BASE_URL}api/option`,
	REMOVE_OPTIONS: `${BASE_URL}api/options`,
	REMOVE_A_CATEGORY: `${BASE_URL}api/categories/`,
	ADD_A_CATEGORY: `${BASE_URL}api/category`,
	UPLOAD_A_FILE: `api/file-upload`,
	ADD_A_PRODUCT: `${BASE_URL}api/product`,
	GET_PRODUCTS: `${BASE_URL}api/products`,
	GET_FEATURED_PRODUCTS: `${BASE_URL}api/get-featured-product`,
	GET_POPULAR_PRODUCTS: `${BASE_URL}api/get-popular-product`,
	GET_ATTRIBUTES: `${BASE_URL}api/attributes`,
	GET_ATTRIBUTES_OPTIONS: `${BASE_URL}api/attributes`
};
