import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OrderStatus } from "../types";
import { colors, radius } from "../theme";

const MAP: Record<OrderStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: "Chờ xác nhận", bg: "#FEF3C7", fg: "#B45309" },
  shipping: { label: "Đang giao", bg: "#E0E7FF", fg: colors.indigo },
  completed: { label: "Hoàn tất", bg: "#DCFCE7", fg: "#15803D" },
  cancelled: { label: "Đã hủy", bg: "#FEE2E2", fg: colors.danger },
};

// Badge trạng thái đơn hàng — mỗi trạng thái một màu
export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = MAP[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  text: { fontSize: 12, fontWeight: "800" },
});
