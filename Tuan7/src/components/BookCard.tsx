import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  book: Book;
  onPress?: (book: Book) => void;
}

// Thẻ sách dạng lưới 2 cột
export function BookCard({ book, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(book)}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <View style={styles.blobA} />
        <View style={styles.blobB} />
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, maxWidth: "50%", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, margin: 6, elevation: 2, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  cover: { height: 120, borderRadius: radius.sm, overflow: "hidden", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  emoji: { fontSize: 46 },
  // vòng tròn trang trí mờ — làm bìa sách nhìn như ảnh bìa thật
  blobA: { position: "absolute", width: 110, height: 110, borderRadius: 55, backgroundColor: "rgba(255,255,255,0.14)", left: -28, bottom: -36 },
  blobB: { position: "absolute", width: 70, height: 70, borderRadius: 35, backgroundColor: "rgba(255,255,255,0.10)", right: -14, top: 20 },
  title: { fontSize: 14, fontWeight: "700", color: colors.text, minHeight: 36 },
  author: { fontSize: 12, color: colors.muted, marginTop: 2 },
  price: { fontSize: 14, fontWeight: "800", color: colors.indigo, marginTop: 6 },
});
