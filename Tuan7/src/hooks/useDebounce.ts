
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Hủy bộ đếm cũ nếu người dùng tiếp tục gõ
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}
