/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const addCategory = async categoryData => {
  return await axiosInstance().post(urls.ADD_A_CATEGORY, {
    ...categoryData,
  });
};

const getAllCategories = async () => {
  return await axiosInstance().get(urls.GET_CATEGORIES);
};

const removeCategory = async id => {
  return await axiosInstance().delete(urls.REMOVE_A_CATEGORY + id);
};

const updateCategoryById = async (id, categoryData) => {
  return await axiosInstance().patch(
    urls.UPDATE_A_CATEGORY + id,
    {
      ...categoryData
    }
  );
};

const blogServices = {
    addCategory,
    getAllCategories,
    removeCategory,
    updateCategoryById
};

export default blogServices;
