# BookStore — Buổi 7 (bản Starter — làm bài)

Điều hướng (React Navigation) · Redux Toolkit cho giỏ hàng/tài khoản · gọi API bằng Axios (json-server) · loading/lỗi/rỗng · tìm kiếm debounce + lọc kết hợp.

## Chạy
```bash
npm install
npm run api          # terminal 1: json-server tại http://localhost:3000 (dữ liệu: db.json)
npx expo start       # terminal 2: bấm  w  để mở bản web, hoặc quét QR bằng Expo Go
```
- Điện thoại thật: máy tính và điện thoại cùng Wi-Fi; nếu không tự nhận được địa chỉ, đặt
  `EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000` trước lệnh `npx expo start`.
- Kiểm tra kiểu: `npx tsc --noEmit`
- Tài khoản demo: **demo@bookstore.vn / 123456** — đăng nhập ở buổi này là **giả lập** (nút "Đăng nhập thử"); đăng nhập thật qua API làm ở buổi sau.

## UI
Xem `docs/UI.md` và ảnh trong `docs/ui/`.

## Cách làm
Tìm mọi chỗ cần viết bằng cách tìm chuỗi `TODO BT7` (VS Code: Ctrl+Shift+F). Các khung viền đứt màu cam trên màn hình là chỗ chưa làm — làm xong thì xoá `<TodoBox …/>`. Đề bài chi tiết ở file Word đi kèm.
