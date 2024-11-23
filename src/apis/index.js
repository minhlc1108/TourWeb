import axios from "axios";
import { API_ROOT } from "~/utils/constants";
import {message} from "~/components/EscapeAntd"

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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

// Tour
export const fetchAllTourAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour`, { params });
  return response.data;
}

export const CreateNewTourAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/tour`,data)
  return response.data
}



//Tour Image
export const uploadImageAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-image/upload`, { params });
  return response.data;
}


//Tour customer 
export const fetchAllCustomerAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/Customer`, { params });
  return response.data;
}

export const getCustomerByIdAPI =  async (id) => {
  const response = await axios.get(`${API_ROOT}/Customer/${id}`);
  return response.data;
} 
export const updateCustomerAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/Customer/${id}`, values);
  return response.data;
};



