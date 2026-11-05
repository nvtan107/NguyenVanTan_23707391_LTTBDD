# BookStore Online — Buổi 8 · Đăng nhập, Đánh giá, Giỏ hàng & Yêu thích (STARTER)

Bản **bài tập**: project chạy được ngay nhưng nhiều chỗ còn trống. Mỗi chỗ trống được đánh dấu bằng mã **`TODO BT8.x`**:
trong code (comment) và trên giao diện (ô viền cam đứt nét). Làm xong một bài thì ô cam tương ứng biến mất.
Đề bài chi tiết nằm trong file Word hướng dẫn Buổi 8. Ảnh giao diện đích: `docs/ui/`; mô tả từng màn hình: `docs/UI.md`.

## Chạy
```bash
npm install
npm run api         # terminal 1: json-server http://localhost:3000 (dữ liệu trong db.json)
npx expo start      # terminal 2: quét QR bằng Expo Go; nhấn  w  để mở bản web
npm run typecheck   # tsc --noEmit
```

- Tài khoản demo: `demo@bookstore.vn` / `123456`
- Điện thoại thật: máy tính và điện thoại cùng Wi-Fi. Nếu app không gọi được API, đặt địa chỉ IP máy tính:
  `EXPO_PUBLIC_API_URL=http://<IP-máy>:3000 npx expo start`
- Ghi chú: json-server ghi thẳng vào `db.json` (đánh giá, tài khoản mới…). Muốn trả dữ liệu về ban đầu: giải nén lại file zip hoặc sửa tay `db.json`.
- Bản web: `Alert.alert` không chạy trên web nên project dùng `utils/dialog.ts` (`window.confirm`/`alert` trên web, `Alert` trên điện thoại).

> **Đăng nhập là GIẢ LẬP** (so sánh mật khẩu ở phía client) — chỉ để học. Hệ thống thật phải để **server** xác thực, cấp token và app lưu token bằng SecureStore.

Stack: Expo SDK 57 · React Native 0.86 · TypeScript · React Navigation 7 · Redux Toolkit · Axios · json-server.

## Danh sách TODO
| Mã | File | Việc cần làm |
|---|---|---|
| BT8.1 | `screens/LoginScreen.tsx` | Form đăng nhập, validate, quay lại đúng màn |
| BT8.2 | `screens/RegisterScreen.tsx` | Form đăng ký, nhập lại mật khẩu |
| BT8.3 | `hooks/usePersistence.ts` | Auto-login khi mở app, ghi/xóa phiên khi đăng nhập/đăng xuất |
| BT8.4 | `screens/CartScreen.tsx`, `screens/CheckoutScreen.tsx` | Chặn Checkout khi chưa đăng nhập |
| BT8.5 | `components/RatingStars.tsx`, `screens/BookDetailScreen.tsx` | Component sao (a), điểm trung bình (b), gửi đánh giá (c) |
| BT8.6 | `components/CartItemRow.tsx` | Nút −/+ có debounce, giới hạn tồn kho |
| BT8.7 | `screens/CartScreen.tsx`, `hooks/useAutoPersist.ts`, `hooks/usePersistence.ts` | Xóa có xác nhận (a), lưu giỏ + yêu thích (b) |
| BT8.8 | `components/HeartButton.tsx`, `screens/WishlistScreen.tsx` | Nút tim dùng chung store (a), màn Yêu thích (b) |
| BT8.C1 | `screens/BookDetailScreen.tsx` | (Thử thách) Sách liên quan |
| BT8.C2 | `screens/CartScreen.tsx` | (Thử thách) Mã giảm giá SALE10 |

Tìm nhanh: `Ctrl+Shift+F` rồi gõ `TODO BT8`.
