import { useEffect, useState } from "react";

// Trả về giá trị "đã trễ": chỉ cập nhật sau khi người dùng ngừng gõ `delay` ms
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // gõ tiếp → huỷ hẹn giờ cũ
  }, [value, delay]);
  return debounced;
}
