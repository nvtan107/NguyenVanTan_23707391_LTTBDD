// Cấu hình cho Bài 10.11 (Bonus, không bắt buộc).
// USE_API = false: đọc dữ liệu từ mảng trong data/books.ts (mặc định của bài thực hành).
// USE_API = true : gọi json-server qua fetch.
export const USE_API = false;

// Trình duyệt chạy cùng máy với json-server: dùng localhost.
// Điện thoại hoặc Expo Go: thay localhost bằng IP LAN của máy chạy json-server, ví dụ "http://192.168.1.10:3000".
export const API_URL = "http://localhost:3000";
