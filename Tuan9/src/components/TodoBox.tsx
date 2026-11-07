import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Khung viền đứt đánh dấu chỗ học viên phải tự viết. Khi làm xong bài nào, XOÁ <TodoBox .../> của bài đó.
export function TodoBox({ id, children }: { id: string; children: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.id}>TODO {id}</Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 2, borderStyle: "dashed", borderColor: "#F59E0B", backgroundColor: "#FFFBEB", borderRadius: 12, padding: 12, gap: 2 },
  id: { color: "#B45309", fontWeight: "800" },
  text: { color: "#92400E" },
});
