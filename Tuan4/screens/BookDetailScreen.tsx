// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc 3 vùng giống Home: phần cố định trên (ảnh bìa) không bắt buộc ở đây vì
// ảnh nằm trong luồng cuộn cùng mô tả — CHỈ CÓ thanh "Thêm vào giỏ" dưới cùng là
// cố định thật sự, nằm ngoài ScrollView.
import React from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
}: {
  book: Book;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>← Quay lại</Text>
      </Pressable>

      {/* ScrollView flex:1 chứa TOÀN BỘ nội dung dài (ảnh + tên + mô tả) để phần
          mô tả dài không đẩy tràn thanh "Thêm vào giỏ" cố định phía dưới. */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: book.cover }}
          // alignSelf:'center' ghi đè alignItems của View cha (nếu cha không
          // center sẵn) để riêng ảnh này được căn giữa theo chiều ngang.
          style={styles.cover}
        />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: row, 2 đầu cách xa nhau, KHÔNG nằm trong ScrollView
          -> luôn đứng yên một chỗ dù nội dung mô tả dài bao nhiêu. */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        <Pressable style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: {
    color: "#4338CA",
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  cover: {
    alignSelf: "center", // căn giữa riêng ảnh, không phụ thuộc alignItems của cha
    width: "70%",
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width theo %
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 14,
    color: "#5B6B7F",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },
  bottomBar: {
    flexDirection: "row", // giá bên trái, nút bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomPrice: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
