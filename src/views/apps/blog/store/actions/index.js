/* eslint-disable semi */
import axios from "axios";

// ** Add Blog
export const addNewBlog = params => {
  return dispatch => {
    return dispatch({ type: "ADD_NEW_BLOG", data: params });
  };
};

// ** Remove a blog
export const removeABlog = params => {
  
  return dispatch => {
    return dispatch({ type: "REMOVE_A_BLOG", data: params });
  };
};

// ** Add Categories
export const addBlogCategories = params => {
  return dispatch => {
    return dispatch({ type: "ADD_BLOG_CATEGORY", data: params });
  };
};
// ** Update Categories list
export const updateBlogCategories = params => {
  return dispatch => {
    return dispatch({ type: "UPDATE_BLOG_CATEGORY", data: params });
  };
};

// ** Remove A Category Item
export const removeItemInBlogCategory = params => {
  
  return dispatch => {
    return dispatch({ type: "REMOVE_BLOG_CATEGORY_ITEM", data: params });
  };
};
