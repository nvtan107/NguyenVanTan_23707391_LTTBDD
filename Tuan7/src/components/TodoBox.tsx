import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  id: string; // ví dụ "BT7.3a"
  children: string; // mô tả việc cần làm
}

// KHUNG VIỀN ĐỨT báo "chỗ này bạn phải tự code". Khi làm xong: XOÁ <TodoBox ... /> khỏi màn hình.
export function TodoBox({ id, children }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.id}>TODO {id}</Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { margin: 10, padding: 12, borderRadius: 12, borderWidth: 2, borderStyle: "dashed", borderColor: "#F59E0B", backgroundColor: "#FFFBEB" },
  id: { color: "#B45309", fontWeight: "800", fontSize: 12 },
  text: { color: "#78350F", marginTop: 2 },
});
