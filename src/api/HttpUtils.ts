// helper.ts
import axios from "axios";
import { HttpMethod, RequestParams } from "./types";
import { configHandler, errorHandler } from "./handler";
import { API_URL } from "@/utils/constants";
// import {store} from '../redux/store';
// import {showToast} from '../utils/helper';

// Axios initial configuration
const jwtAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

// Applying axios interceptors
jwtAxios.interceptors.response.use(
  (config) => {
    console.log("🚀 ~ Request", configHandler(config));
    return config;
  },
  (response) => {
    console.log("🚀 ~ response:", response, response?.response?.data);
    if (response?.response?.data?.success === false) {
      alert(response.response.data?.message);
      return Promise.reject(response.response);
    } else if (
      response?.message?.includes("Request failed") ||
      response?.message?.includes("Network Error") ||
      response?.message?.includes("CanceledError")
    ) {
      return Promise.reject(response);
    }
    // return response;
  },
  //@ts-ignore
  (error) => {
    console.log("🚀 ~ error:", errorHandler(error));
    return Promise.reject(errorHandler(error));
  }
);

// Generic request function
export const request = async ({
  url,
  method,
  data = {},
  config = {},
  cancelToken,
}: RequestParams) => {
  try {
    const response = await jwtAxios({
      url,
      method,
      data: method === "GET" || method === "DELETE" ? undefined : data,
      params: method === "GET" || method === "DELETE" ? data : undefined,
      cancelToken: cancelToken ? cancelToken.token : undefined,
      ...config,
      // headers: {
      //   Authorization: store.getState().auth.token
      //     ? `Bearer ${store.getState().auth.token}`
      //     : undefined,
      // },
    });
    // if (response.data?.ResponseToken) {
    //   store.dispatch(setToken(response.data?.ResponseToken));
    // }
    return response.data;
  } catch (error) {
    handleError(error, method);
  }
};

// Error handling function with method-specific messages
const handleError = (error: any, method: HttpMethod): void => {
  // Customize error handling
  const errorMessage = `${method} request failed`;
  console.error(`${errorMessage}: ${error}`);
  // if (error?.response?.data === 'Invalid token') {
  //   store.dispatch(setToken(null));
  //   // showToast('success', 'Session Expired. Kindly login again!');
  // }
  // error?.message?.includes('Network Error') &&
  //   showToast('danger', 'Network Error');
  return error;
};
