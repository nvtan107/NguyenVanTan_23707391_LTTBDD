import axios from "axios";
import { API_URL } from "./config";

// MỘT axios instance dùng chung cho toàn app
export const api = axios.create({ baseURL: API_URL, timeout: 8000 });

// Interceptor request: tự gắn token (token lấy qua hàm do App đăng ký — tránh import vòng với store)
let tokenProvider: () => string | null = () => null;
export const setTokenProvider = (fn: () => string | null) => {
  tokenProvider = fn;
};

api.interceptors.request.use((config) => {
  const token = tokenProvider();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor response: gom lỗi về MỘT thông điệp tiếng Việt dễ hiểu
api.interceptors.response.use(
  (res) => res,
  (error) => {
    let message = "Đã có lỗi xảy ra. Vui lòng thử lại.";
    if (axios.isAxiosError(error)) {
      if (!error.response) message = "Không kết nối được máy chủ. Hãy kiểm tra json-server đang chạy và cùng mạng Wi-Fi.";
      else if (error.response.status === 404) message = "Không tìm thấy dữ liệu.";
      else if (error.response.status >= 500) message = "Máy chủ đang gặp sự cố.";
    }
    return Promise.reject(new Error(message));
  }
);

export const getErrorMessage = (e: unknown) => (e instanceof Error ? e.message : "Đã có lỗi xảy ra.");
