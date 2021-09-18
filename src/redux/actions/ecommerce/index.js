/*eslint-disable*/

import axiosInstance from "../../../configs/axiosInstance";
import { urls } from "@urls";
import { addCategories } from "../../../views/apps/ecommerce/store/actions";
import { addFiles } from "../../../views/apps/media/store/action";
import { useDispatch } from "react-redux";
import { addShippingClassList } from "../../../views/apps/settings/shipping/store/action";
export const getAllCategories = () => {
  return dispatch => {
    return axiosInstance()
      .get(urls.GET_CATEGORIES)
      .then(res => {
        dispatch(addCategories(res.data.data));
      });
  };
};

export const getAllMedia = () => {
  return dispatch => {
    return axiosInstance()
      .get(urls.GET_FILES)
      .then(res => {
        dispatch(addFiles(res.data.results));
      });
  };
};

export const getAllShipping = () =>{
    return dispatch => {
        return axiosInstance()
          .get(urls.GET_SHIPPING_CLASS)
          .then(res => {
            dispatch(addShippingClassList(res.data.results));
          });
      };
}
export const clearMedia = () => {
  return dispatch => {
    dispatch({ type: "CLEAR_MEDIA" });
  };
};

export const clearEcommerce = () => {
  return dispatch => {
    dispatch({ type: "CLEAR_ECOMMERCE" });
  };
};

export const clearShipping = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_SHIPPING",
    });
  };
};
