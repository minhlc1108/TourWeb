import axios from "axios";
import { API_ROOT } from "~/utils/constants";
import {message} from "~/components/EscapeAntd"

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const data = error.response.data
    // if(data.status){
    //     console.log(data)
    // }
    const data = error.response.data;
    console.log(data);
    if (data?.message && typeof data?.message === "string") {
      message.error(data.message);
    } else if (data?.status) {
      console.log(data.title + ` - Status code: ${data.status}`);
      message.error(data.title + ` - Status code: ${data.status}`);
    }
    return Promise.reject(error);
  }
);
//Category
export const fetchAllCategoryAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/category`, { params });
  return response.data;
};

export const createNewCategoryAPI = async (values) => {
  const response = await axios.post(`${API_ROOT}/category`, values);
  return response.data;
};

export const updateCategoryAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/category/${id}`, values);
  return response.data;
};

export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/category/${id}`);
  return response.data;
};
// Promotion API
export const fetchAllPromotionAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/promotion`, { params });
  return response.data;
};

export const createNewPromotionAPI = async (values) => {
  const response = await axios.post(`${API_ROOT}/promotion`, values);
  return response.data;
};

export const updatePromotionAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/promotion/${id}`, values);
  return response.data;
};

export const deletePromotionAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/promotion/${id}`);
  return response.data;
};
