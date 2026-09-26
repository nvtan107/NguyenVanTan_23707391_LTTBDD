// GIỜ 3 — Bài tập 1: Badge giảm giá / nhãn "Mới" nổi trên ảnh bìa
// Kỹ thuật: position 'absolute' của badge NEO theo containing block là View cha
// (View bọc ảnh) — View cha đó phải có position 'relative' thì top/left mới có
// điểm tựa đúng, chứ không phải theo toàn màn hình.
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function DiscountBadge({ discountPercent, isNew }: { discountPercent?: number; isNew?: boolean }) {
  if (!discountPercent && !isNew) return null; // sách bình thường -> không vẽ gì cả

  return (
    <View style={[styles.badge, isNew && styles.badgeNew]}>
      <Text style={styles.badgeText}>{isNew ? "Mới" : `-${discountPercent}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute", // thoát khỏi luồng layout bình thường
    top: 6,
    left: 6, // neo theo góc trên-trái của containing block (View bọc ảnh)
    backgroundColor: "#DC2626", // đỏ nổi bật cho giảm giá
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeNew: {
    backgroundColor: "#F97316", // cam cho nhãn "Mới"
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
