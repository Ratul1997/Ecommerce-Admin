/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getAllProducts = async () => {
  return await axiosInstance().get(urls.GET_PRODUCTS);
};

const getProductDetailsById = async id => {
  return await axiosInstance().get(urls.GET_PRODUCTS_ADMIN_BY_ID + id);
};

const addNewProduct = async product => {
  return await axiosInstance().post(urls.ADD_A_PRODUCT, { product });
};

const updateProductDetailsById = async (id, updatedProduct) => {
  return await axiosInstance().patch(urls.UPDATE_PRODUCT_DETAILS + id, {
    ...updatedProduct,
  });
};

const getProductAttributeById = async id => {
  return await axiosInstance().get(urls.GET_PRODUCT_ATTRIBUTES_BY_ID + id);
};

const getAllAttributes = async () => {
  return await axiosInstance().get(urls.GET_ATTRIBUTES);
};

const updateProductInventory = async (id, updatedInventory) => {
  return await axiosInstance().patch(urls.UPDATE_INVENTORIES_BY_ID + id, {
    ...updatedInventory,
  });
};

const updateProductPriceById = async (id, updatedPrices) => {
  return await axiosInstance().patch(urls.UPDATE_PRODUCT_PRICE + id, {
    ...updatedPrices,
  });
};

const updateProductShippingById = async (id, updatedShippingData) => {
  return await axiosInstance().patch(urls.UPDATE_PRODUCT_SHIPPING_CLASS + id, {
    ...updatedShippingData,
  });
};

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

const updateFeaturedProductById = async (id,updatedData) =>{
  return await axiosInstance().patch(
    urls.UPDATE_FEATURED_PRODUCT_BY_ID + id,
    {
      ...updatedData
    }
  );
}

const updatePopularProductById = async (id,updatedData) =>{
  return await axiosInstance().patch(
    urls.UPDATE_POPULAR_PRODUCT_BY_ID + id,
    {
      ...updatedData
    }
  );
}

const removeProductById = async id =>{
  return await axiosInstance().delete(urls.DELETE_PRODUCT + id);
}
const productServices = {
  getAllProducts,
  addNewProduct,
  getProductDetailsById,
  updateProductDetailsById,
  getProductAttributeById,
  getAllAttributes,
  updateProductPriceById,
  updateProductInventory,
  updateProductShippingById,
  getAllCategories,
  removeCategory,
  addCategory,
  updateCategoryById,
  updateFeaturedProductById,
  updatePopularProductById,
  removeProductById
};

export default productServices;
