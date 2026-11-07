import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props {
  bookId: number;
  size?: number;
  style?: ViewStyle;
}

// Nút tim: đọc/ghi CHUNG store wishlist → Grid và Detail luôn nhất quán
export function HeartButton({ bookId, size = 34, style }: Props) {
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);
  return (
    <Pressable
      onPress={() => toggle(bookId)}
      hitSlop={6}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
    >
      <Text style={{ fontSize: size * 0.55, color: fav ? colors.heart : colors.muted }}>{fav ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center", zIndex: 2 },
});
