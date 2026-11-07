1. Giá trị dẫn xuất
Trong màn Checkout, errors và valid là các giá trị có thể tính trực tiếp từ dữ liệu form hiện tại, nên không cần lưu thêm bằng useState. Nếu lưu riêng bằng state, dữ liệu có thể bị lệch khi người dùng sửa input nhưng state errors hoặc valid chưa được cập nhật đúng lúc, dẫn đến hiển thị lỗi cũ hoặc cho phép submit khi form chưa hợp lệ.
2. Thứ tự gọi
Nếu gọi clear() trước await createOrder(...), giỏ hàng sẽ bị xóa ngay cả khi request tạo đơn thất bại do mất mạng, khiến người dùng mất các sản phẩm đã chọn. Đặt clear() ngay sau createOrder(...) giúp chỉ xóa giỏ hàng khi máy chủ đã xác nhận tạo đơn thành công; nếu request lỗi thì giỏ hàng vẫn được giữ lại.
3. PUT hay PATCH
Nếu dùng PUT /users/1 với { name, phone }, máy chủ thường thay thế toàn bộ đối tượng user bằng dữ liệu được gửi lên; các trường không gửi như email, password, role có thể bị mất khỏi bản ghi. Bài này chọn PATCH vì chỉ cần cập nhật một phần thông tin (name, phone) và giữ nguyên các trường còn lại.
4. Cập nhật lạc quan
Nếu bỏ phần hoàn lại read: false trong catch, giao diện vẫn hiển thị thông báo đã đọc dù máy chủ chưa cập nhật được, khiến trạng thái trên giao diện và dữ liệu thật không đồng nhất. Một chức năng phù hợp để dùng cập nhật lạc quan là thêm/xóa sách khỏi danh sách yêu thích vì có thể hoàn tác khi lỗi; chức năng không nên dùng là thanh toán/tạo đơn vì cần chờ máy chủ xác nhận để tránh hiển thị giao dịch thành công giả.
5. Trong file word