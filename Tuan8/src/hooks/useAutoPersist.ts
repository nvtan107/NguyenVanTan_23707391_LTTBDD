
import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// Hook dùng chung để tự động lưu dữ liệu
export function useAutoPersist<T>(
  key: string,
  value: T,
  ready: boolean
) {
  useEffect(() => {
    // Chưa đọc dữ liệu cũ xong thì không được ghi
    if (!ready) return;

    // Lưu dữ liệu vào AsyncStorage
    saveJSON(key, value);

  }, [key, value, ready]);
}
