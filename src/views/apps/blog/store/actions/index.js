/* eslint-disable semi */
import axios from "axios";

// ** Add Categories
export const addBlogCategories = params => {
  return dispatch => {
    return dispatch({ type: "ADD_CATEGORY", data: params });
  };
};
// ** Update Categories list
export const updateBlogCategories = params => {
  return dispatch => {
    return dispatch({ type: "UPDATE_CATEGORY", data: params });
  };
};

// ** Remove A Category Item
export const removeItemInBlogCategory = params => {
  
  return dispatch => {
    return dispatch({ type: "REMOVE_CATEGORY_ITEM", data: params });
  };
};
