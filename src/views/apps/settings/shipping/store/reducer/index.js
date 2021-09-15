/*eslint-disable*/
import { findValueInArray } from "@utils";

const initialState = {
  shipping: [],
};

const updateShippingList = (previousList, data) => {
  const index = findValueInArray(
    previousList,
    data.shipping_class_id,
    "shipping_class_id"
  );
  if (index > -1) {
    previousList[index] = data;
  }
  return [...previousList];
};

const addShippingClass = (previousList, data) => {
  previousList.unshift(data);
  return [...previousList];
};

const deleteShippingClass = (previousList, id) => {
  const index = findValueInArray(
    previousList,
    id,
    "shipping_class_id"
  );
  if (index > -1) {
    previousList.splice(index, 1);
  }
  return [...previousList];
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SHIPPING_CLASS_LIST":
      return {
        ...state,
        shipping: [...action.data],
      };
    case "ADD_SHIPPING_CLASS":
      return {
        ...state,
        shipping: addShippingClass(state.shipping, action.data),
      };
    case "UPDATE_SHIPPING_CLASS":
      return {
        ...state,
        shipping: updateShippingList(state.shipping, action.data),
      };
    case "DELETE_SHIPPING_CLASS":
      return {
        ...state,
        shipping: deleteShippingClass(state.shipping, action.id),
      };
    default:
      return state;
  }
};

export default shippingReducer;
