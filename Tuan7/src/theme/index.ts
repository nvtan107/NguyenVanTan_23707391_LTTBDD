// Bộ nhận diện dùng xuyên suốt khoá học: navy / indigo / cyan
export const colors = {
  navy: "#0B1F5C",
  indigo: "#3B3FD8",
  cyan: "#00B8D9",
  bg: "#F4F6FB",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  line: "#E2E8F0",
  danger: "#DC2626",
  success: "#16A34A",
  warning: "#F59E0B",
  heart: "#EF4444",
};

export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };

export const formatPrice = (n: number) => n.toLocaleString("vi-VN") + " đ";
