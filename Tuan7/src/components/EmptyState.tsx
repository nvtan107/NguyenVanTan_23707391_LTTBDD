import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  emoji?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Trạng thái rỗng dùng lại ở nhiều màn (không có kết quả, giỏ trống, chưa có đơn…)
export function EmptyState({ emoji = "📭", title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.msg}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <Pressable style={styles.btn} onPress={onAction}>
          <Text style={styles.btnText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", padding: 32, gap: 6 },
  emoji: { fontSize: 52 },
  title: { fontSize: 17, fontWeight: "800", color: colors.text, textAlign: "center" },
  msg: { color: colors.muted, textAlign: "center" },
  btn: { marginTop: 10, backgroundColor: colors.indigo, paddingHorizontal: 18, paddingVertical: 10, borderRadius: radius.md },
  btnText: { color: "#fff", fontWeight: "800" },
});
