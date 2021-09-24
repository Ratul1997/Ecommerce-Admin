/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const userLogin = async loginData => {
  return await axiosInstance().post(urls.LOGIN_URL, {
    ...loginData,
  });
};

const authServices = {
  userLogin,
};

export default authServices;
