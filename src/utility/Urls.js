/* eslint-disable */

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const urls = {
  // Category
  GET_CATEGORIES: `api/categories`,
  REMOVE_A_CATEGORY: `api/categories/`,
  UPDATE_A_CATEGORY: `api/categories/`,
  ADD_A_CATEGORY: `api/category`,

  // Attributes
  GET_ATTRIBUTES: `api/attributes`,
  REMOVE_ATTRIBUTES: `api/attributes/`,
  ADD_ATTRIBUTE: `api/attribute`,

  // Attribute Options
  ADD_OPTION: `api/option`,
  REMOVE_OPTIONS: `api/options`,
  GET_ATTRIBUTES_OPTIONS: `api/attributes`,

  // Files
  UPLOAD_A_FILE: `api/file-upload`,
  UPLOADED_LINK: `uploads/`,
  GET_FILES: `api/files`,
  REMOVE_FILES_BY_ID: `api/files/`,

  // Products
  ADD_A_PRODUCT: `api/admin/product`,
  GET_PRODUCTS: `api/admin/products`,
  GET_PRODUCTS_BY_ID: `api/admin/products/`,
  GET_PRODUCTS_ADMIN_BY_ID: `api/admin/edit/products/`,
  GET_FEATURED_PRODUCTS: `api/get-featured-product`,
  GET_POPULAR_PRODUCTS: `api/get-popular-product`,
  GET_PRODUCT_ATTRIBUTES_BY_ID: `api/product-attributes/`,
  UPDATE_POPULAR_PRODUCT_BY_ID: `api/admin/popular/`,
  UPDATE_FEATURED_PRODUCT_BY_ID: `api/admin/featured/`,
  UPDATE_PRODUCT_SHIPPING_CLASS: `api/admin/products/shipping/`,
  UPDATE_PRODUCT_DETAILS: `api/admin/products/basicInfo/`,
  UPDATE_PRODUCT_PRICE: `api/admin/products/priceInfo/`,
  DELETE_PRODUCT: `api/admin/products/`,

  // Invoice
  GET_INVOICE_USERS: `api/invoices/clients`,
  GET_LAST_INVOICE_ID: `api/invoices/lastId`,
  ADD_INVOICE_CLIENT: `api/invoices/client`,
  ADD_INVOICE: `api/invoice`,
  GET_INVOICE: `api/invoices`,
  GET_INVOICE_BY_ID: `api/invoices/`,
  REMOVE_INVOICE_BY_ID: `api/invoices/`,
  UPDATE_INVOICE_BY_ID: `api/invoices/update/`,

  // Reviews
  GET_RATINGS: `api/rating/total`,
  GET_REVIEWS: `api/ratings`,
  REMOVE_REVIEWS_BY_ID: `api/ratings/`,
  GET_REVIEWS_BY_ID: `api/ratings/`,

  // Calender
  ADD_CALENDER_EVENT: `api/calender/add-event/`,
  GET_CALENDER_EVENTS: `api/calendar/events/`,
  REMOVE_CALENDER_EVENTS: `api/calendar/events/`,
  UPDATE_CALENDER_EVENTS: `api/calendar/update-event`,

  // Orders
  GET_ORDERS_LIST: `api/orders`,
  GET_ORDERS_BY_ID: `api/orders/`,
  SEND_EMAIL: `api/send-email`,
  GET_PRE_ORDERS: `api/pre-orders`,
  GET_PRE_ORDERS_BY_ID: `api/pre-orders/`,

  // Price Tag
  GENERATE_TAGS: `api/tag`,
  GET_TAGS: `api/tags`,
  GET_TAGS_BY_ID: `api/tags/`,

  // Customers
  GET_USERS: `api/users`,
  GET_USERS_BY_ID: `api/users/`,

  // Admin
  GET_ADMIN_INFO: `api/admin/admin-info`,
  UPDATE_ADMIN_GENERAL_INFO: `api/admin/admin-info/general`,
  UPDATE_ADMIN_PAYMENT_INFO: `api/admin/admin-info/paymentDetails`,

  // Inventories
  GET_INVENTORIES: `api/inventories`,
  UPDATE_INVENTORIES_BY_ID: `api/inventories/`,
  GET_INVENTORIES_VARIATIONS: `api/inventories/variations/`,

  // ANALYTICS
  GET_INVENTORY_ANALYTICS: `api/ecommerce/analytics/inventory`,

  // Login
  LOGIN_URL: `api/adminAuth/login`,
  ADMIN_REGISTER: `api/adminAuth/register`,

  // Shipping
  GET_SHIPPING_CLASS: `api/shipping`,
  POST_SHIPPING_CLASS: `api/shipping`,
  UPDATE_SHIPPING_CLASS: `api/shipping/`,
  REMOVE_SHIPPING_CLASS: `api/shipping/`,

  // Facebook Pixel
  FACEBOOK_PIXEL: `api/marketing/fb-pixel`,
};
