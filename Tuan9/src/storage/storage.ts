import AsyncStorage from "@react-native-async-storage/async-storage";

// Bọc AsyncStorage: tự JSON.stringify / JSON.parse, không bao giờ ném lỗi ra ngoài
export async function saveJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bỏ qua lỗi ghi — app vẫn chạy */
  }
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    /* bỏ qua */
  }
}
