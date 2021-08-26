/*eslint-disable*/

import { backOrdersOptions, stockOptions } from "../../../Constants";

const getAllowBackOrders = allowBackOrders => {
  return backOrdersOptions.filter(item => item.label === allowBackOrders)[0];
};
const getStockStatus = stock => {
  return stockOptions.filter(item => item.label === stock)[0];
};
export const VariantsModel = item => {
  const variantsProduct = {
    combinations: item.product_variant_combinations || item.combinations,
    featured_img: item.featured_img ? JSON.parse(item.featured_img) : null,
    regular_price: item.regular_price || 0.0,
    discount_price: item.discount_price || 0.0,
    quantity: item.quantity || 0,
    manageStock: item.manageStock === 1 ? true : false,
    sku: item.sku || "",
    stock_threshold: item.stock_threshold || 0,
    allowBackOrders: item.allowBackOrders
      ? getAllowBackOrders(item.allowBackOrders)
      : {
          value: 1,
          label: "Do not allow",
        },
    inventory_status: item.inventory_status
      ? getStockStatus(item.inventory_status)
      : { value: 1, label: "In Stock" },
  };
  return variantsProduct;
};
