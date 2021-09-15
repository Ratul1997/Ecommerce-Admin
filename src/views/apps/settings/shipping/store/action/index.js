/*eslint-disable*/

export const addShippingClassList = data => ({
  type: "ADD_SHIPPING_CLASS_LIST",
  data: data,
});

export const addShippingClass = data => ({
  type: "ADD_SHIPPING_CLASS",
  data: data,
});

export const updateShippingClass = data => ({
  type: "UPDATE_SHIPPING_CLASS",
  data: data,
});

export const deleteShippingClass = id => ({
  type: "DELETE_SHIPPING_CLASS",
  id: id,
});
