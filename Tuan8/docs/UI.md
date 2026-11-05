# Mô tả giao diện ĐÍCH — Buổi 8 (bản STARTER)

> Bản Starter chưa có các phần này: chỗ nào còn trống sẽ hiện ô viền cam “TODO BT8.x” (xem `docs/ui/ui_00_starter_todo.png`). Hoàn thành bài tập để giao diện giống mô tả bên dưới.

Khung màu: navy `#0B1F5C` (thanh tiêu đề), indigo `#3B3FD8` (nút chính, giá), cyan `#00B8D9` (điểm nhấn). Nền `#F4F6FB`, thẻ trắng bo góc 12px.
Ảnh minh hoạ: `docs/ui/ui_01…05_*.png` (số trong vòng cam khớp với mục bên dưới).

## 1. Đăng nhập — BT8.1 (`ui_01_login_register.png`)
1. Logo 📚 + tiêu đề “Đăng nhập BookStore” căn giữa; ô **Email** (bàn phím email) và **Mật khẩu** (ẩn ký tự).
2. Nút **Đăng nhập** indigo toàn chiều ngang; khi gọi API hiện spinner và không bấm lại được.
3. Dòng “Chưa có tài khoản? Đăng ký” (indigo, đậm).
4. Hộp xanh nhạt: “Tài khoản demo: demo@bookstore.vn / 123456”.
- Bỏ trống rồi bấm Đăng nhập: viền ô chuyển **đỏ**, dòng lỗi đỏ nhỏ **ngay dưới từng ô** (“Vui lòng nhập email”, “Vui lòng nhập mật khẩu”).
- Sai mật khẩu: dòng lỗi đỏ chung “Email hoặc mật khẩu không đúng”.

## 2. Đăng ký — BT8.2
4 ô: Họ tên, Email, Mật khẩu, Nhập lại mật khẩu; lỗi dưới từng ô; “Nhập lại mật khẩu” phải khớp. Đăng ký xong tự đăng nhập.

## 3. Phiên đăng nhập, chặn Checkout — BT8.3, BT8.4 (`ui_02_auth_flow.png`)
1. Tab **Tài khoản** khi chưa đăng nhập: ổ khóa 🔒, “Bạn chưa đăng nhập”, nút Đăng nhập / Đăng ký.
2. **Thanh toán** (khung tối giản, form đặt hàng làm ở buổi sau): chỉ hiện “Tổng tiền cần thanh toán” + số tiền. Chưa đăng nhập bấm Thanh toán → chuyển sang màn Đăng nhập, đăng nhập xong **quay lại Checkout**.
3. Tab Tài khoản khi đã đăng nhập: avatar, tên, email, “Danh sách yêu thích (n sách)”, nút **Đăng xuất**.
4. Tắt/mở lại app: vẫn đang đăng nhập (auto-login).

## 4. Chi tiết sách & Đánh giá — BT8.5, BT8.C1 (`ui_03_reviews.png`)
1. Dưới tên tác giả: hàng 5 sao vàng + “4.5 (2 đánh giá)” — điểm trung bình **tự tính lại** khi có đánh giá mới.
2. Chưa đăng nhập: hộp “Đăng nhập để viết đánh giá” + nút viền Đăng nhập.
3. Đã đăng nhập: thẻ “Viết đánh giá của bạn” — 5 sao bấm chọn, ô Bình luận, nút **Gửi đánh giá**; thiếu sao/bình luận → lỗi đỏ.
4. Danh sách đánh giá: tên người viết, sao nhỏ bên phải, nội dung; đánh giá mới hiện **trên cùng ngay lập tức**.
5. (Thử thách) “Sách liên quan”: hàng ngang các thẻ sách cùng danh mục, trừ sách đang xem.

## 5. Giỏ hàng — BT8.6, BT8.7, BT8.C2 (`ui_04_cart.png`)
1. Mỗi dòng: ảnh bìa, tên, giá; nút **−  số lượng  +** và chữ “Còn n” (tồn kho); nút − mờ khi = 1, nút + mờ khi = tồn kho.
2. Biểu tượng thùng rác → hộp thoại xác nhận “Xóa … khỏi giỏ hàng?”.
3. Chân giỏ: ô “Mã giảm giá (SALE10)” + nút Áp dụng; dòng xanh “Đã áp dụng SALE10: Giảm 10%” hoặc đỏ “Mã giảm giá không hợp lệ”; Tạm tính / Giảm giá / **Tổng cộng**; nút Thanh toán.
4. Giỏ trống: 🛒 “Giỏ hàng trống” + nút “Khám phá sách”.
Giỏ hàng được **lưu lại** khi tắt và mở app.

## 6. Yêu thích — BT8.8 (`ui_05_wishlist.png`)
1. Tim ♡ ở góc phải ảnh bìa (Home và Chi tiết); bấm → ♥ đỏ; hai nơi **đồng bộ**.
2. Màn “Yêu thích”: lưới 2 cột các sách đã thả tim (vào từ Tài khoản → Danh sách yêu thích); bỏ tim thì sách biến mất ngay.
3. Trống: 💔 “Chưa có sách yêu thích” + nút “Khám phá sách”.
Danh sách yêu thích cũng được lưu lại.
