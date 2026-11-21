import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Book } from "../types";
import { formatPrice } from "../utils";
import { colors } from "../theme";

// BT10.3a
interface BookCardProps {
  book: Book;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
}

// BT10.3b + BT10.4
function BookCard({ book, layout = "row", onSelect }: BookCardProps) {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(book.id)}
      activeOpacity={0.8}
      testID={`book-${book.id}`}
    >
      <View style={[styles.coverBox, isTile && styles.coverBoxTile]}>
        <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
        {isTile && <Text style={styles.ratingBadge}>⭐ {book.rating.toFixed(1)}</Text>}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>{book.title}</Text>
        {!isTile && <Text style={styles.sub}>{book.author}</Text>}
        {!isTile && <Text style={styles.sub}>{book.category}</Text>}
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(book.price)}</Text>
          {!isTile && <Text style={styles.sub}>⭐ {book.rating.toFixed(1)}</Text>}
          <Text>{book.inStock ? "✅" : "❌"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// BT10.3c
export default React.memo(BookCard);

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 14, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.line, gap: 12 },
  cardTile: { flexDirection: "column", width: "48%", gap: 8 },
  coverBox: { width: 70, height: 100, borderRadius: 8, overflow: "hidden", backgroundColor: colors.indigo },
  coverBoxTile: { width: "100%", height: "auto", aspectRatio: 2 / 3 }, // height "auto" để aspectRatio có hiệu lực
  cover: { width: "100%", height: "100%" },
  ratingBadge: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11, fontWeight: "700", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, overflow: "hidden" },
  info: { flex: 1, gap: 4, justifyContent: "center" },
  infoTile: { flexGrow: 0, flexBasis: "auto" }, // không co về 0, để tên sách hiện đủ
  title: { fontSize: 15, fontWeight: "800", color: colors.text },
  sub: { fontSize: 12, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { color: colors.indigo, fontWeight: "800" },
});