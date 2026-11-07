import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppNotification } from "../types";
import { formatDateTime } from "../utils/format";
import { colors, radius } from "../theme";

interface Props {
  item: AppNotification;
  onPress: (n: AppNotification) => void;
}

// Chưa đọc: nền xanh nhạt + chấm đỏ + tiêu đề đậm. Đã đọc: nền trắng.
export function NotificationItem({ item, onPress }: Props) {
  return (
    <Pressable style={[styles.row, !item.read && styles.unread]} onPress={() => onPress(item)}>
      <View style={styles.dotWrap}>{!item.read && <View style={styles.dot} />}</View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[styles.title, !item.read && styles.titleUnread]}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
        <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, backgroundColor: "#fff", borderRadius: radius.md, padding: 14 },
  unread: { backgroundColor: "#E0E7FF" },
  dotWrap: { width: 10, paddingTop: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.heart },
  title: { color: colors.text, fontWeight: "600", fontSize: 15 },
  titleUnread: { fontWeight: "800" },
  body: { color: colors.muted },
  time: { color: colors.muted, fontSize: 11, marginTop: 2 },
});
