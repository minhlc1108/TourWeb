import axios from "axios";
import { API_ROOT } from "~/utils/constants";
import { message } from "~/components/EscapeAntd";
import { signOut } from "~/store/authSlice";

let _store;
export const injectStore = (store) => {
  _store = store;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Hoặc từ Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token in Redux and redirect to login
      _store.dispatch(signOut());
    }
    if (error.response && error.response.status === 403) {
      // Clear the token in Redux and redirect to login
      message.error("Bạn không có quyền thực hiện!");
    }

    const data = error.response.data;

    if (data.statusCode === 410 ){
      _store.dispatch(signOut());
      message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    }

    if (data?.message && typeof data?.message === "string") {
      message.error(data.message);
    } else if (data?.status) {
      message.error(data.title + ` - Status code: ${data.status}`);
    }

    return Promise.reject(error);
  }
);

//Account
export const fetchAllAccountsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/account/listAccount`);
  return response.data;
};

export const deleteAccountAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/account/delete/${id}`);
  return response.data;
};
export const getAccountByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/account/${id}`);
  return response.data;
};

export const updateAccountStatusAPI = async (id, status) => {
  const response = await axios.put(
    `${API_ROOT}/account/updateStatus/${id}`,
    status
  );
  return response.data;
};

export const updateAccountAPI = async (id, accountData) => {
  const response = await axios.put(
    `${API_ROOT}/account/update/${id}`,
    accountData
  );
  return response.data;
};



export const fetchAccountDetailsAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/account/${id}`);
  return response.data;
};
export const loginAPI = async (username, password) => {
  const response = await axios.post(`${API_ROOT}/account/login`, {
    username,
    password,
  });
  return response.data;
};

export const registerAPI = async (infor) => {
  const response = await axios.post(`${API_ROOT}/account/register`, infor);
  return response.data;
};

export const forgotPasswordAPI = async (email) => {
  const response = await axios.post(
    `${API_ROOT}/account/forgot-password`,
    JSON.stringify(email),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

//Customer
export const fetchAllCustomersAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/customer/listCustomer`, {
    params,
  });
  return response.data;
};

export const updateCustomerAnAPI = async (id, customerData) => {
  const response = await axios.put(
    `${API_ROOT}/customer/update/${id}`,
    customerData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const deleteCustomerAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/customer/delete/${id}`);
  return response.data;
};

export const fetchCustomerDetailsAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/customer/${id}`);
  return response.data;
};

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

export const deleteTourAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/tour/${id}`);
  return response.data;
};

//Tour Image
export const uploadImageAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-image/upload`, { params });
  return response.data;
};

// Tour Schedule
export const getTourSchedulesAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule`, { params });
  return response.data;
};

export const fetchTourScheduleByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule/${id}`);
  return response.data;
};

export const createNewTourScheduleAPI = async (values) => {
  const response = await axios.post(`${API_ROOT}/tour-schedule`, values);
  return response.data;
};

export const updateTourScheduleAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/tour-schedule/${id}`, values);
  return response.data;
};

export const deleteTourScheduleAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/tour-schedule/${id}`);
  return response.data;
};
//Tour customer
export const fetchAllCustomerAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/Customer/listCustomer`, { params });
  return response.data;
}
export const getCustomerByEmailAPI =  async (email) => {
  const response = await axios.get(`${API_ROOT}/Customer/email/${email}`);
  return response.data;
};

export const getCustomerByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/Customer/${id}`);
  return response.data;
};
export const updateCustomerAPI = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/Customer/update/${id}`, values);
  return response.data;
};

// Booking minh
export const createBookingAPI = async (values) => {
  const response = await axios.post(`${API_ROOT}/booking`, values);
  return response.data;
};

export const fetchPaymentBookingAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/booking/details/${id}`);
  return response.data;
};

export const updateBookingStatusAPI = async (params) => {
  const response = await axios.put(`${API_ROOT}/booking/status`, params);
  return response.data;
};

//Booking
export const fetchAllBooking = async (params) => {
  const response = await axios.get(`${API_ROOT}/booking`, { params });
  return response.data;
};

export const updateBooking = async (id, values) => {
  const response = await axios.put(`${API_ROOT}/booking/${id}`, values);
  return response.data;
};

export const createBooking = async (data) => {
  const response = await axios.post(`${API_ROOT}/booking`, data);
  return response.data;
};

export const createAdminBooking = async (data) => {
  const response = await axios.post(
    `${API_ROOT}/booking/create-booking-customer`,
    data
  );
  return response.data;
};

export const updateAdminBooking = async (id, data) => {
  const response = await axios.put(
    `${API_ROOT}/booking/update-booking-customer/${id}`,
    data
  );
  return response.data;
};

export const updateStatusBooking = async (id, data) => {
  const response = await axios.put(
    `${API_ROOT}/booking/update-status/${id}`,
    data
  );
  return response.data;
};

export const fetchAllBookingAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/booking`, { params });
  return response.data;
}

export const deleteBookingAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/booking/${id}`);
  return response.data;
};

//Booking detail
export const fetchAllBookingDetailsByIdBook = async (id) => {
  const response = await axios.get(`${API_ROOT}/booking-detail/${id}`);
  return response.data;
};

export const CreateBookingDetail = async (data) => {
  const response = await axios.post(`${API_ROOT}/booking-detail`, data);
  return response.data;
};

//Customer
export const fetchAllCustomers = async (params) => {
  const response = await axios.get(`${API_ROOT}/customer`, { params });
  return response.data;
};

//Tour Schedules
export const fetchAllTourSchedulesAPI = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour-schedule`, { params });
  return response.data;
};

//Tour
export const fetchAllTours = async (params) => {
  const response = await axios.get(`${API_ROOT}/tour/get-tours`, { params });
  return response.data;
};
export const checkBeforeCreatePaymentAPI = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/booking/check-before-create-payment/${id}`
  );
  return response.data;
};

export const CreatePaymentVNPayAPI = async (params) => {
  const response = await axios.post(
    `${API_ROOT}/booking/payment/vnpay`,
    params
  );
  return response.data;
};
