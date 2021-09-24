/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getAllPreOrders = async () => {
  return await axiosInstance().get(urls.GET_PRE_ORDERS);
};

const getPreOrderById = async id => {
  return await axiosInstance().get(urls.GET_ORDERS_BY_ID + id);
};

const updatePreOrderById = async (id, updatedData) => {
  return await axiosInstance().patch(urls.GET_PRE_ORDERS_BY_ID + id, {
    ...updatedData,
  });
};

const deletePreOrderById = async (id, deletedData) => {
  return await axiosInstance().delete(urls.GET_PRE_ORDERS_BY_ID + id, {
    ...deletedData,
  });
};

const preOrderServices = {
  getAllPreOrders,
  getPreOrderById,
  updatePreOrderById,
  deletePreOrderById,
};

export default preOrderServices;
