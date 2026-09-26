// GIỜ 2 — Bài tập 1: Danh mục dạng chip, tự xuống dòng khi tràn
// Kỹ thuật: flexWrap 'wrap' + gap, mỗi chip width 'auto' theo nội dung.
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../data";

// LƯU Ý (đúng gợi ý "so sánh khi có/không có alignContent"): alignContent chỉ
// tạo khác biệt QUAN SÁT ĐƯỢC khi container có chiều cao LỚN HƠN nội dung nhiều
// dòng — vì nó điều khiển cách các DÒNG (không phải từng phần tử) phân bố trong
// phần dư đó. Nếu container chỉ cao vừa đủ (mặc định), bật/tắt alignContent sẽ
// KHÔNG thấy gì đổi. Đặt true bên dưới để tự tạo chiều cao dư và thấy rõ hiệu ứng.
const DEMO_EXTRA_HEIGHT = false;

export function CategoryChips() {
  return (
    <View
      style={[
        styles.wrap,
        DEMO_EXTRA_HEIGHT && { height: 220, alignContent: "flex-start" },
      ]}
    >
      {CATEGORIES.map((name) => (
        <View key={name} style={styles.chip}>
          {/* Không set width cho Text/View chip -> tự rộng theo nội dung chữ */}
          <Text style={styles.chipText}>{name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", // xếp các chip theo hàng...
    flexWrap: "wrap", // ...và tự xuống dòng khi hết chỗ ngang
    gap: 8, // khoảng cách đều cả 2 chiều (hàng lẫn cột) giữa các chip
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999, // bo tròn lớn -> dạng "viên thuốc" (pill)
    borderWidth: 1,
    borderColor: "#6366F1", // indigo
    // Không set "width" -> mỗi chip tự co giãn đúng theo độ dài tên danh mục
  },
  chipText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "600",
  },
});
