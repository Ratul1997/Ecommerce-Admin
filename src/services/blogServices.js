/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const addBlogCategory = async categoryData => {
  return await axiosInstance().post(urls.ADD_A_BLOG_CATEGORY, {
    ...categoryData,
  });
};

const getAllBlogCategories = async () => {
  return await axiosInstance().get(urls.GET_BLOG_CATEGORIES);
};

const removeBlogCategory = async id => {
  return await axiosInstance().delete(urls.REMOVE_A_BLOG_CATEGORY + id);
};

const updateBlogCategoryById = async (id, categoryData) => {
  return await axiosInstance().patch(
    urls.UPDATE_A_BLOG_CATEGORY + id,
    {
      ...categoryData
    }
  );
};

const blogServices = {
    addBlogCategory,
    getAllBlogCategories,
    removeBlogCategory,
    updateBlogCategoryById
};

export default blogServices;
