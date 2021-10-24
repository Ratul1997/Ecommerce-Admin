/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const addNewBlog = async blogDetails => {
  return await axiosInstance().post(urls.ADD_A_BLOG, { blogDetails });
};

const getAllBlogs = async () => {
  return await axiosInstance().get(urls.GET_ALL_BLOG);
};

const removeBlog = async blog_id => {
  return await axiosInstance().delete(urls.DELETE_A_BLOG + blog_id);
};

const addCategory = async categoryData => {
  return await axiosInstance().post(urls.ADD_A_BLOG_CATEGORY, {
    ...categoryData,
  });
};

const getAllCategories = async () => {
  return await axiosInstance().get(urls.GET_BLOG_CATEGORIES);
};

const removeCategory = async id => {
  return await axiosInstance().delete(urls.REMOVE_A_BLOG_CATEGORY + id);
};

const updateCategoryById = async (id, categoryData) => {
  return await axiosInstance().patch(
    urls.UPDATE_A_BLOG_CATEGORY + id,
    {
      ...categoryData
    }
  );
};

const blogServices = {
    addNewBlog,
    getAllBlogs,
    removeBlog,
    addCategory,
    getAllCategories,
    removeCategory,
    updateCategoryById
};

export default blogServices;
