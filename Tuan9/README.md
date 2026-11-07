# BookStore — Buổi 9 (STARTER)

Bản **thiếu code** để sinh viên hoàn thiện theo bài thực hành Buổi 9. Chạy được ngay; các phần chưa làm hiện khung cam viền đứt `

## Chạy
```bash
npm install
npm run api          # terminal 1: json-server http://localhost:3000
npx expo start       # terminal 2: quét QR bằng Expo Go, nhấn w để mở web
npm run typecheck    # tsc --noEmit
```
Tài khoản demo: `demo@bookstore.vn` / `123456`

Điện thoại thật: cùng Wi-Fi với máy tính, đặt `EXPO_PUBLIC_API_URL=http://<IP-máy>:3000` trước khi `npx expo start`.

> Đăng nhập là **giả lập** (so sánh mật khẩu ở client) chỉ để học; hệ thống thật phải xác thực ở server và lưu token bằng SecureStore.

Stack: Expo SDK 57 · React Native 0.86 · TypeScript · React Navigation 7 · Redux Toolkit · Axios · json-server 0.17.4.
Giao diện mô tả: xem `docs/UI.md` và `docs/ui/*.png`.

## Danh sách việc cần làm
| ID | File | Việc |
|---|---|---|
| BT9.1a/b/c | screens/CheckoutScreen.tsx | validate, 3 ô nhập địa chỉ, 2 PaymentOption |
| BT9.2 | services/orderService.ts, CheckoutScreen | `createOrder`, `submit` (Alert, xoá giỏ, về Home, lỗi giữ giỏ) |
| BT9.3a/b/c/d | OrdersScreen, orderService, AccountScreen | tải đơn, FlatList + chi tiết, empty state, menu |
| BT9.4a/b/c | EditProfileScreen, userService, AccountScreen | form hồ sơ, `updateProfile`, hiện SĐT + nút sửa |
| BT9.5a–f | notificationService, NotificationsScreen, AccountScreen | tải, đánh dấu đã đọc, FlatList, điều hướng |
| BT9.6 | screens/HomeScreen.tsx | pull-to-refresh |
| BT9.7 | app.json | name, icon, splash, adaptiveIcon (assets có sẵn) |
| BT9.8 | — | checklist rà soát & demo (không code) |
| BT9.C1 | OrdersScreen | thử thách "Mua lại" |

Tìm nhanh: 
