# BookStore · Buổi 10 · Bản Starter (làm bài)

Ứng dụng bán sách dùng React Navigation, Redux Toolkit và dữ liệu lấy từ một mảng cho sẵn (data/books.ts). Làm trên snack.expo.dev. Phần bắt buộc không gọi API. Bài 10.11 (Bonus, không bắt buộc) lấy dữ liệu từ json-server.

## Làm trên Snack (snack.expo.dev)

1. Mở https://snack.expo.dev, tạo Snack mới. Không cần đăng nhập để chạy thử.
2. Dùng TypeScript: tạo `App.tsx` bằng nút + ở khung Files, dán nội dung vào, rồi xoá `App.js` có sẵn. Các file khác dùng đuôi `.ts` hoặc `.tsx`.
3. Tạo từng file bằng nút +, gõ đúng đường dẫn (ví dụ `screens/HomeScreen.tsx`). Nội dung của tất cả file nằm trong `ALL_IN_ONE.md`; mở các file trong gói này và dán vào Snack.
4. Thêm thư viện: nhập danh sách sau vào ô Dependencies, hoặc chọn Add dependency khi Snack đề nghị:

```
react-native-safe-area-context, react-native-screens, @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs, @reduxjs/toolkit, react-redux
```

5. Chọn tab Web (hoặc Preview) để xem kết quả. Màn hình trắng thì nhấn Reload.
6. Chụp màn hình minh chứng từ Web preview sau mỗi bài, có cả khung code và đồng hồ hệ thống. Lưu Snack bằng nút Save hoặc Share nếu cần đường dẫn.

## Bảng bài và file liên quan

| Bài | Nội dung | File |
|---|---|---|
| Bài 10.1 | Khung ứng dụng và tiêu đề | App.tsx, screens/HomeScreen.tsx |
| Bài 10.2 | Danh sách sách từ mảng | screens/HomeScreen.tsx |
| Bài 10.3 | Component BookCard | components/BookCard.tsx, screens/HomeScreen.tsx |
| Bài 10.4 | Hai kiểu hiển thị row và tile | components/BookCard.tsx |
| Bài 10.5 | Dạng lưới và kéo để làm mới | screens/HomeScreen.tsx |
| Bài 10.6 | Tìm kiếm và lọc theo thể loại | screens/HomeScreen.tsx |
| Bài 10.7 | React Navigation | navigation.tsx, App.tsx, screens/HomeScreen.tsx |
| Bài 10.8 | Redux Toolkit: store và giỏ hàng | store/cartSlice.ts, App.tsx |
| Bài 10.9 | Thêm vào giỏ, tăng giảm, badge | store/cartSlice.ts, screens/DetailScreen.tsx, navigation.tsx |
| Bài 10.10 | Yêu thích | store/favoritesSlice.ts, screens/DetailScreen.tsx, screens/FavoritesScreen.tsx |
| Bài 10.11 (Bonus) | Fetch API với json-server | config.ts, store/booksSlice.ts, screens/HomeScreen.tsx, db.json |

Mở từng file trong bảng trên và tìm chữ `TODO BT10`. Mỗi nhãn có dạng `TODO BT10.x` và khớp với Bài 10.x trong tài liệu hướng dẫn. Trước khi làm xong Bài 10.8, không mở tab Giỏ hàng và Yêu thích vì hai màn này cần Redux Provider.

## Bài 10.11 (Bonus): json-server

Trong `config.ts`, `USE_API = false` đọc mảng (mặc định), `true` gọi API. Bước phụ trợ chạy ngoài Snack: mở terminal trên máy (cần Node.js), vào thư mục có `db.json` và chạy:

```
npx json-server@0.17.4 --watch db.json --port 3000 --host 0.0.0.0
```

Kiểm tra bằng trình duyệt: http://localhost:3000/books. Bản Web của Snack chạy trong trình duyệt cùng máy nên gọi được localhost (trình duyệt có thể hỏi quyền truy cập mạng nội bộ). Chạy trên điện thoại hoặc Expo Go thì đổi `API_URL` sang IP LAN của máy chạy json-server. Nộp bài thì đặt lại `USE_API = false`.

## Ghi chú

- Bản web của React Native không có cử chỉ kéo-để-làm-mới, nên RefreshControl kiểm tra bằng Preview iOS/Android hoặc Expo Go.
- Phiên bản các gói do Snack chọn có thể khác nhau theo thời điểm. Gặp lỗi lạ thì nhấn Reload và kiểm tra lại mục Dependencies.
- `db.json` chỉ dùng cho Bài 10.11, không dán vào Snack. Bản Full có thêm thư mục `docs/ui` chứa ảnh giao diện đích, cũng không dán vào Snack.
