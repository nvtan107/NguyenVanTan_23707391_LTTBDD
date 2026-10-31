import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  message: string;
  onRetry: () => void;
}

// Lỗi mạng → thông báo + nút "Thử lại"
export function ErrorView({ message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.msg}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>Thử lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24 },
  emoji: { fontSize: 44 },
  msg: { color: colors.text, textAlign: "center" },
  btn: { backgroundColor: colors.indigo, paddingHorizontal: 22, paddingVertical: 10, borderRadius: radius.md },
  btnText: { color: "#fff", fontWeight: "800" },
});
