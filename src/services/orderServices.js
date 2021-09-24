/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getAllOrders = async () => {
  return await axiosInstance().get(urls.GET_ORDERS_LIST);
};

const getOrderById = async id => {
  return await axiosInstance().get(urls.GET_ORDERS_BY_ID + id);
};

const updateOrderById = async (id, updatedData) => {
  return await axiosInstance().patch(urls.GET_ORDERS_BY_ID + id, {
    ...updatedData,
  });
};

const orderServices = {
  getAllOrders,
  getOrderById,
  updateOrderById,
};

export default orderServices;
