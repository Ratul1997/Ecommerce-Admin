/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getInvoiceUsers = async () => {
  return await axiosInstance().get(urls.GET_INVOICE_USERS);
};

const addInvoiceUser = async data => {
  return await axiosInstance().post(urls.ADD_INVOICE_CLIENT, { ...data });
};

const getInvoiceDetailsById = async id => {
  return await axiosInstance().get(urls.GET_INVOICE_BY_ID + id);
};

const addInvoice = async data => {
  return await axiosInstance().post(urls.ADD_INVOICE, { ...data });
};

const updateInvoiceItemsById = async (id, invoiceData) => {
  return await axiosInstance().put(urls.UPDATE_INVOICE_BY_ID + id, {
    ...invoiceData,
  });
};

const deleteInvoiceById = async id => {
  return await axiosInstance().delete(urls.REMOVE_INVOICE_BY_ID + id);
};

const getInvoices = async () => {
  return await axiosInstance().get(urls.GET_INVOICE);
};
const invoiceServices = {
  getInvoiceUsers,
  addInvoiceUser,
  getInvoiceDetailsById,
  addInvoice,
  updateInvoiceItemsById,
  getInvoices,
  deleteInvoiceById,
};
export default invoiceServices;
