/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getAllUser = async () => {
  return await axiosInstance().get(urls.GET_USERS)
}

const addNewUser = async newUserData => {
  return await axiosInstance().post(urls.ADD_USER, {
    ...newUserData,
  });
}

const userServices = {
  getAllUser,
  addNewUser
};

export default userServices;
