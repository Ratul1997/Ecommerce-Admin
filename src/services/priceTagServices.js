/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const addPriceTagTemplate = async tagData => {
  return await axiosInstance().post(urls.GENERATE_TAGS, {
    ...tagData,
  });
};

const getAllPriceTags = async () => {
  return await axiosInstance().get(urls.GET_TAGS);
};

const deletePriceTagById = async id => {
  return await axiosInstance().delete(urls.GET_TAGS_BY_ID + id);
};

const getPriceTagDetailsById = async id => {
  return await axiosInstance().get(urls.GET_TAGS_BY_ID + id);
};

const priceTagServices = {
  addPriceTagTemplate,
  getAllPriceTags,
  deletePriceTagById,
  getPriceTagDetailsById,
};
export default priceTagServices;
