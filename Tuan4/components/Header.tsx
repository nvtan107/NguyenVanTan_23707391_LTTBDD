// GIỜ 1 — Bài tập 1: Header ứng dụng BookStore
// Kỹ thuật: flexDirection 'row' + justifyContent 'space-between' + alignItems 'center'
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Header() {
  return (
    // Container header: xếp NGANG (row), 2 đầu cách xa nhau (space-between),
    // căn GIỮA theo chiều dọc (center) — đúng 3 thuộc tính yêu cầu của bài tập.
    <View style={styles.header}>
      <Text style={styles.logo}>📚 BookStore</Text>

      {/* Nhóm 2 icon bên phải: 1 View con riêng, cũng dùng flexDirection 'row',
          khoảng cách giữa 2 icon dùng "gap" thay vì marginLeft cho gọn. */}
      <View style={styles.iconGroup}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // xếp logo và nhóm icon theo hàng ngang
    justifyContent: "space-between", // đẩy 2 đầu ra xa nhau tối đa
    alignItems: "center", // căn giữa theo trục dọc (trục chéo của row)
    height: 56, // chiều cao cố định theo yêu cầu
    paddingHorizontal: 16, // padding ngang 16 theo yêu cầu
    backgroundColor: "#1E1B4B", // navy/indigo — màu chủ đạo khoá học
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  iconGroup: {
    flexDirection: "row", // 2 icon nằm ngang cạnh nhau
    gap: 14, // khoảng cách đều giữa 2 icon, không cần marginLeft thủ công
  },
  icon: {
    fontSize: 18,
  },
});
