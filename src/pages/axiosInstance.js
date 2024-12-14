import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Địa chỉ API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm Interceptor cho tất cả request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
  console.log("axios");
  if (token) {
    // Thêm Authorization header nếu token tồn tại
    config.headers.x_authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
