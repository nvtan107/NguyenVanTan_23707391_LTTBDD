import { Alert, Platform } from "react-native";

// Alert.alert KHÔNG hoạt động trên bản web của React Native → bọc lại để chạy được cả 3 nền tảng.

export function showMessage(title: string, message?: string, onOk?: () => void) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n${message}` : title);
    onOk?.();
  } else {
    Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
  }
}

export function confirmDialog(title: string, message: string, onConfirm: () => void, confirmText = "Xóa") {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: "Hủy", style: "cancel" },
      { text: confirmText, style: "destructive", onPress: onConfirm },
    ]);
  }
}
