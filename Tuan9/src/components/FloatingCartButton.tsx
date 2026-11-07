import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Badge } from "./Badge";
import { colors } from "../theme";

interface Props {
  count: number;
  onPress?: () => void;
}

// Nút giỏ hàng nổi: position absolute + Badge góc trên-phải
export function FloatingCartButton({ count, onPress }: Props) {
  return (
    <Pressable style={styles.fab} onPress={onPress} accessibilityLabel="Giỏ hàng">
      <Text style={styles.icon}>🛒</Text>
      <Badge count={count} style={styles.badge} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: { position: "absolute", right: 16, bottom: 16, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.cyan, alignItems: "center", justifyContent: "center", elevation: 6, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  icon: { fontSize: 24 },
  badge: { position: "absolute", top: -4, right: -4 },
});
