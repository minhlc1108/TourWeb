import axios from "axios";
import { API_ROOT } from "~/utils/constants";
import { message } from "~/components/EscapeAntd";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const data = error.response.data;
    if (data?.message && typeof data?.message === "string") {
      message.error(data.message);
    } else if (data?.status) {
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

export const getPromotionByCodeAPI = async (code) => {
  const response = await axios.get(`${API_ROOT}/promotion/code/${code}`);
  return response.data;
}

// Tour
export const getTourByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/tour/${id}`);
  return response.data;
};

export const fetchAllTourAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour`, { params });
  return response.data;
};

export const createNewTourAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/tour`, data);
  return response.data;
};

export const updateTourAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/tour/${id}`, values);
  return response.data;
};

export const deleteTourAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/tour/${id}`);
  return response.data;
};

//Tour Image
export const uploadImageAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-image/upload`, { params });
  return response.data;
}

// Tour Schedule
export const getTourSchedulesAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule`, { params });
  return response.data;
}

export const fetchTourScheduleByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule/${id}`);
  return response.data;
}

export const createNewTourScheduleAPI = async (values) => {
  const response = await axios.post(`${API_ROOT}/tour-schedule`, values);
  return response.data;
}

export const updateTourScheduleAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/tour-schedule/${id}`, values);
  return response.data;
}

export const deleteTourScheduleAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/tour-schedule/${id}`);
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



