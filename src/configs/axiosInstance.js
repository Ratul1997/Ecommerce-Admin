/*eslint-disable*/
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = (token = null) => {
  const instance = axios.create();

  instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded; charset=utf-8" == "application/json";
  instance.defaults.headers['Accept'] ='application/json; charset=utf-8" == "application/json'
  instance.defaults.timeout = 5000;
  instance.defaults.baseURL = BASE_URL;
  //instance.defaults.headers.common["Authorization"] = "Token " + token;

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // config.headers['Authorization'] = 'Token ' + token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const responseObject = {
        status: response.status,
        data: response.data,
      };
      return responseObject;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // console.log(error.response)
      const errorObject = {
        status: error.response.status,
        data: error.response.data,
      };
      return Promise.reject(errorObject);
    }
  );
  return instance;
};
export default axiosInstance;
