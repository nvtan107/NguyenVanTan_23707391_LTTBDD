#Câu hỏi bổ sung – BookStore Buổi 7
1. Cấu trúc điều hướng
BookDetail được đăng ký trong Stack vì đây là màn hình chi tiết được mở từ một màn hình khác và người dùng có thể quay lại bằng nút Back. Nếu đặt trong Tab, BookDetail sẽ trở thành một tab ngang hàng với Home hoặc Danh mục, làm thanh tab xuất hiện cả khi xem chi tiết và không đúng luồng điều hướng chính.
2. Redux
state.items.push(...) không sửa trực tiếp state gốc vì Redux Toolkit dùng Immer để tạo bản nháp (draft); Immer tự tạo state mới khi reducer kết thúc. Bỏ useMemo trong useCart thường không làm thay đổi kết quả hiển thị, nhưng các giá trị như tổng số lượng và tổng tiền sẽ bị tính lại ở mỗi lần render, gây tính toán thừa.
3. Promise.all
Nếu getCategories() lỗi thì Promise.all bị reject dù getBooks() thành công; nếu Home dùng chung một catch để đặt lỗi thì màn hình sẽ hiện trạng thái lỗi thay vì danh sách sách. Có thể dùng Promise.allSettled để kiểm tra kết quả từng API và vẫn hiển thị sách khi chỉ API danh mục lỗi. Đổi lại, code xử lý phức tạp hơn và phải có giao diện/thông báo riêng cho phần danh mục bị lỗi hoặc chưa tải được.
4. Debounce
Không nên đặt setTimeout trực tiếp trong onChangeText vì mỗi lần gõ có thể tạo thêm một bộ hẹn giờ, khiến nhiều lần lọc chạy liên tiếp và có thể dùng từ khóa cũ. return () => clearTimeout(timer) hủy bộ hẹn giờ trước đó khi giá trị thay đổi hoặc component bị tháo, giúp chỉ xử lý sau khi người dùng ngừng gõ đủ thời gian.
5. Code bổ sung – Sắp xếp theo giá
Trong file word