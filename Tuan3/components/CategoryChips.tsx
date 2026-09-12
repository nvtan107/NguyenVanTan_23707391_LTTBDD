import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../data";

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
