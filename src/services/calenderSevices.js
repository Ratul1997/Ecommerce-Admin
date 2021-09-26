/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const createAdmin = async adminData => {
  return await axiosInstance().post(urls.ADMIN_REGISTER, {
    ...adminData,
  });
};

const calenderServices = {
    createAdmin,
};

export default calenderServices;
