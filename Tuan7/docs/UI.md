# UI mô tả — BookStore Buổi 7 (bản Starter)

Ảnh nằm trong `docs/ui/` và `docs/ui/screens/` — đây là **giao diện ĐÍCH** sau khi bạn hoàn thành mọi `// TODO BT7.x`. Lúc mới tải về, các vùng chưa làm hiển thị khung **viền đứt màu cam** (xem `docs/ui/ui_00_starter_todo.png`); làm xong thì xoá khung đó.
Bảng màu: **navy #0B1F5C** (header, tiêu đề) · **indigo #3B3FD8** (nút chính, giá, tab đang chọn) · **cyan #00B8D9** (nút giỏ nổi, chip giá đang chọn) · nền **#F4F6FB** · thẻ trắng bo góc 16.

| Màn | Ảnh | Bố cục & thành phần |
|---|---|---|
| Home | `home.png` | Header navy "📚 BookStore" + nút 🔍 · hàng chip danh mục cuộn ngang · 3 nút lọc giá viền cyan · lưới 2 cột `BookGrid` (thẻ trắng: bìa màu + emoji, tên, tác giả, giá indigo đậm) · nút giỏ tròn cyan nổi góc phải dưới · Tab Bar tự dựng 4 mục |
| Home — loading | `loading.png` | Giữa màn: vòng xoay indigo + "Đang tải sách…" |
| Home — lỗi | `error.png` | Biểu tượng cảnh báo + câu tiếng Việt "Không kết nối được máy chủ…" + nút indigo **Thử lại** |
| Tìm kiếm | `search.png` | Bấm 🔍 → ô nhập trắng viền sáng dưới header + chữ "Đóng"; có chữ → hiện chip đỏ nhạt "✕ Xóa bộ lọc"; kết quả lọc sau 400 ms |
| Không có kết quả | `empty.png` | 🔎 + "Không tìm thấy sách phù hợp" + gợi ý xám + nút **Xóa bộ lọc** |
| Lọc danh mục / giá | `filter.png`, `filter_price.png` | Chip đang chọn nền indigo chữ trắng; nút giá đang chọn nền cyan; kết hợp được cả hai |
| Chi tiết sách | `detail.png` | Header "Chi tiết sách" có mũi tên ← · bìa màu cao 220 bo 16 + emoji 90px · tên 22 đậm · tác giả xám · giá indigo 20 đậm · "Còn N cuốn" · mô tả · nút indigo **Thêm vào giỏ** |
| Giỏ hàng | `cart.png`, `home_badge.png` | Danh sách `CartItemRow` (ô màu + emoji, tên, giá, số lượng) · chân trang trắng: "Tổng cộng: …" navy đậm + nút **Thanh toán** (mờ khi giỏ rỗng) · Tab "Giỏ hàng" có **badge đỏ** = tổng số lượng |
| Thanh toán | `checkout.png` | Giữa màn: "Tổng tiền cần thanh toán" xám + số tiền indigo 32 đậm (nhận qua `route.params.total`) |
| Danh mục | `categories.png` | Mỗi danh mục 1 hàng trắng bo 12: emoji 26 + tên đậm + mũi tên › |
| Home đã lọc | `home_from_category.png` | Sau khi bấm danh mục → về Home, chip tương ứng đang chọn |
| Tài khoản | `account_out.png`, `account_in.png` | Chưa đăng nhập: 🔒 + "Bạn chưa đăng nhập" + nút "Đăng nhập thử (dữ liệu giả)". Đã đăng nhập: 🙂 + tên + email + nút viền **Đăng xuất** |
