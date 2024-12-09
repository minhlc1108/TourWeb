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

// Tour
export const getTourByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/tour/${id}`);
  return response.data;
};
export const getTourDetail = async (id) => {
  const response = await axios.get(`${API_ROOT}/tour/get-detail/${id}`);
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



//Booking
export const fetchAllBooking = async (params) => {
  const response = await axios.get(`${API_ROOT}/booking`, { params });
  return response.data;
}

export const updateBooking = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/booking/${id}`, values);
  return response.data;
};


export const createBooking = async (data) => {
  const response = await axios.post(`${API_ROOT}/booking`, data)
  return response.data
}

export const createAdminBooking = async (data) => {
  const response = await axios.post(`${API_ROOT}/booking/create-booking-customer`, data)
  return response.data
}

export const updateAdminBooking = async (id,data) => {
  const response = await axios.put(`${API_ROOT}/booking/update-booking-customer/${id}`, data)
  return response.data
}

export const updateStatusBooking = async (id,data) => {
  const response = await axios.put(`${API_ROOT}/booking/update-status/${id}`, data)
  return response.data
}

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_ROOT}/booking/${id}`);
  return response.data;
};

//Booking detail
export const fetchAllBookingDetailsByIdBook = async (id) => {
  const response = await axios.get(`${API_ROOT}/booking-detail/${id}`);
  return response.data;
}

export const CreateBookingDetail = async (data) => {
  const response = await axios.post(`${API_ROOT}/booking-detail`, data)
  return response.data
}

//Customer
export const fetchAllCustomers = async (params) => {
  const response = await axios.get(`${API_ROOT}/customer`, { params });
  return response.data;
}

//Tour Schedules
export const fetchAllTourSchedulesAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule`, { params });
  return response.data;
}


//Tour
export const fetchAllTours = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour/get-tours`, { params });
  return response.data;
}
