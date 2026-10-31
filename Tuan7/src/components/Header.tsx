import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

interface Props {
  title: string;
  onSearchPress?: () => void; // có truyền → hiện icon Tìm
}

// Header dùng chung. Bài 7.7 gắn onSearchPress để mở ô tìm kiếm.
export function Header({ title, onSearchPress }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 14 }]}>
      <Text style={styles.title}>{title}</Text>
      {onSearchPress && (
        <Pressable style={styles.iconBtn} onPress={onSearchPress} hitSlop={8} accessibilityLabel="Tìm kiếm">
          <Text style={styles.icon}>🔍</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.navy, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 18 },
});
