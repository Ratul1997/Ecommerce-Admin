/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getShippingCost = async cartProductIds => {
  return await axiosInstance().get(urls.GET_SHIPPING_COST + cartProductIds);
};

const getPaymentInfo = async () => {
  return await axiosInstance().get(urls.GET_ADMIN_INFO);
};

const addCheckoutOrder = async checkoutOrderdata => {
  console.log(checkoutOrderdata)
  return await axiosInstance().post(urls.ADD_CHECKOUT_ORDER, {
    ...checkoutOrderdata,
  });
}

const getOrderTypes = async () => {
  return await axiosInstance().get(urls.GET_ORDER_TYPE);
}

const shippingServices = {
    getShippingCost,
    getPaymentInfo,
    addCheckoutOrder,
    getOrderTypes
};

export default shippingServices;
