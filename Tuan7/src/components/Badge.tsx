import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../theme";

interface Props {
  count: number;
  style?: ViewStyle; // dùng để định vị absolute từ bên ngoài
}

// Badge số lượng. count = 0 thì không hiển thị.
export function Badge({ count, style }: Props) {
  if (count <= 0) return null;
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{count > 99 ? "99+" : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 5, backgroundColor: colors.heart, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff", fontSize: 11, fontWeight: "800" },
});
