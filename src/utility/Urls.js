/* eslint-disable */

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const urls = {
  GET_CATEGORIES: `${BASE_URL}api/categories`,
  GET_ATTRIBUTES: `${BASE_URL}api/attributes`,
  REMOVE_ATTRIBUTES: `${BASE_URL}api/attributes/`,
  ADD_ATTRIBUTE: `${BASE_URL}api/attribute`,
  ADD_OPTION: `${BASE_URL}api/option`,
  REMOVE_OPTIONS: `${BASE_URL}api/options`,
  REMOVE_A_CATEGORY: `${BASE_URL}api/categories/`,
  ADD_A_CATEGORY: `${BASE_URL}api/category`,
  UPLOAD_A_FILE: `api/file-upload`,
  ADD_A_PRODUCT: `${BASE_URL}api/admin/product`,
  GET_PRODUCTS: `${BASE_URL}api/admin/products`,
  GET_PRODUCTS_BY_ID: `${BASE_URL}api/admin/products/`,
  GET_PRODUCTS_ADMIN_BY_ID: `${BASE_URL}api/admin/edit/products/`,
  GET_FEATURED_PRODUCTS: `${BASE_URL}api/get-featured-product`,
  GET_POPULAR_PRODUCTS: `${BASE_URL}api/get-popular-product`,
  GET_ATTRIBUTES: `${BASE_URL}api/attributes`,
  GET_ATTRIBUTES_OPTIONS: `${BASE_URL}api/attributes`,
  GET_INVOICE_USERS: `${BASE_URL}api/invoices/clients`,
  GET_LAST_INVOICE_ID: `${BASE_URL}api/invoices/lastId`,
  ADD_INVOICE_CLIENT: `${BASE_URL}api/invoices/client`,
  GET_RATINGS: `${BASE_URL}api/rating/total`,
  ADD_INVOICE: `${BASE_URL}api/invoice`,
  GET_INVOICE: `${BASE_URL}api/invoices`,
  GET_INVOICE_BY_ID: `${BASE_URL}api/invoices/`,
  REMOVE_INVOICE_BY_ID: `${BASE_URL}api/invoices/`,
  UPDATE_INVOICE_BY_ID: `${BASE_URL}api/invoices/update/`,
  ADD_CALENDER_EVENT: `${BASE_URL}api/calender/add-event/`,
  GET_CALENDER_EVENTS: `${BASE_URL}api/calendar/events/`,
  REMOVE_CALENDER_EVENTS: `${BASE_URL}api/calendar/events/`,
  UPDATE_CALENDER_EVENTS: `${BASE_URL}api/calendar/update-event`,
  GET_ORDERS_LIST: `${BASE_URL}api/orders`,
  GET_ORDERS_BY_ID: `${BASE_URL}api/orders/`,
  SEND_EMAIL: `${BASE_URL}api/send-email`,
  GET_PRE_ORDERS: `${BASE_URL}api/pre-orders`,
  GET_PRE_ORDERS_BY_ID: `${BASE_URL}api/pre-orders/`,
  UPLOADED_LINK: `${BASE_URL}uploads/`,
};
