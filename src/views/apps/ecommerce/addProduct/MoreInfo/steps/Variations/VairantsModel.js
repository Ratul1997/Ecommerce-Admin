/*eslint-disable*/

export const VariantsModel = item => {
  const variantsProduct = {
    combinations: item.combinations,
    featured_img: item.featured_img || null,
    regular_price: item.regular_price || 0.0,
    discount_price: item.discount_price || 0.0,
    quantity: item.quantity || 0,
    manageStock: item.manageStock || false,
    sku: item.sku || "",
    stock_threshold: item.stock_threshold || 0,
    allowBackOrders: item.allowBackOrders || {
      value: 1,
      label: "Do not allow",
    },
    inventory_status: item.inventory_status || { value: 1, label: "In Stock" },
  };
  return variantsProduct;
};
