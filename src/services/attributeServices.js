/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const saveAttributeOptions = async attributeOptions => {
  return await axiosInstance().post(urls.ADD_OPTION, {
    ...attributeOptions,
  });
};

const removeAttributeOptions = async optionsValue => {
  return await axiosInstance().delete(urls.REMOVE_OPTIONS, {
    ...optionsValue,
  });
};

const removeAttributeById = async id => {
  return await axiosInstance().delete(urls.REMOVE_ATTRIBUTES + id);
};

const addAttribute = async attributeData => {
  return await axiosInstance().post(urls.ADD_ATTRIBUTE, {
    ...attributeData
  });
};

const getAttributes = async () => {
  return await axiosInstance().get(urls.GET_ATTRIBUTES);
};

const attributeServices = {
  saveAttributeOptions,
  removeAttributeOptions,
  removeAttributeById,
  getAttributes,
  addAttribute,
};

export default attributeServices;
