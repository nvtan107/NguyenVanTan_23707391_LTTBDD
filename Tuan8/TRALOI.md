1. Cờ ready
Nếu bỏ điều kiện ready, ở lần render đầu tiên, cartItems trong Redux có thể vẫn là mảng rỗng vì dữ liệu AsyncStorage chưa được tải xong. useAutoPersist sẽ ghi mảng rỗng đè lên giỏ hàng đã lưu trước đó. Khi effect khôi phục dữ liệu chạy, giỏ hàng cũ có thể đã bị mất.
2. Token giả
Có hai điểm không an toàn:
- Ứng dụng tự kiểm tra mật khẩu ở phía client nên người dùng có thể can thiệp hoặc bỏ qua bước kiểm tra.
- Token tự tạo không được máy chủ xác thực, nên không chứng minh được người dùng đã đăng nhập hợp lệ.
Trong hệ thống thật, Backend kiểm tra mật khẩu và cấp token. Token nên được lưu trong vùng lưu trữ bảo mật như SecureStore (Expo SecureStore) hoặc Keychain/Keystore, thay vì AsyncStorage.
3. Hai effect trong CartItemRow
Khi xóa effect đồng bộ setQty(item.quantity), số lượng hiển thị có thể bị lệch sau khi thay đổi số lượng từ một nơi khác, chẳng hạn khôi phục giỏ hàng từ AsyncStorage hoặc cập nhật số lượng ở một màn hình khác. Store đã có số lượng mới nhưng state nội bộ của component vẫn giữ số lượng cũ.
4. Một nguồn state
Nếu mỗi HeartButton dùng useState riêng, nhấn tim ở trang chi tiết chỉ cập nhật nút tim tại trang đó; nút tim ở lưới sách có thể vẫn hiển thị trạng thái cũ. Redux Store cung cấp một nguồn dữ liệu chung, nên tất cả component đọc cùng trạng thái và tự cập nhật khi Store thay đổi.
5. Trong file word