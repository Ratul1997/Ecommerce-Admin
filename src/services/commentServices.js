/*eslint-disable*/
import { urls } from "@urls";
import axiosInstance from "@configs/axiosInstance";

const getAllComments = async () => {
  return await axiosInstance().get(urls.GET_REVIEWS);
};

const commentServices = {
    getAllComments,
};

export default commentServices;
