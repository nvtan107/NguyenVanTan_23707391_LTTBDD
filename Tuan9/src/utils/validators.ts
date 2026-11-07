// Validate cơ bản — mỗi hàm trả về thông báo lỗi, hoặc null nếu hợp lệ
export const validateEmail = (v: string): string | null => {
  if (!v.trim()) return "Vui lòng nhập email";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Email không đúng định dạng";
};

export const validatePassword = (v: string): string | null => {
  if (!v) return "Vui lòng nhập mật khẩu";
  return v.length >= 6 ? null : "Mật khẩu tối thiểu 6 ký tự";
};

export const validateRequired = (label: string) => (v: string): string | null =>
  v.trim() ? null : `Vui lòng nhập ${label}`;

export const validatePhone = (v: string): string | null => {
  if (!v.trim()) return "Vui lòng nhập số điện thoại";
  return /^(0|\+84)\d{9}$/.test(v.replace(/\s/g, "")) ? null : "Số điện thoại không hợp lệ (vd 0901234567)";
};
