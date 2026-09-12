// GIỜ 1 — Bài tập 2: Thẻ sách (Book Card) đơn, dạng HÀNG (row)
// Kỹ thuật: ảnh cố định bên trái + cột thông tin flex:1 bên phải, giá neo đáy cột
// bằng justifyContent 'space-between' trên trục dọc.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../data";

// Đổi giá trị này để so sánh 2 cách căn theo trục chéo của card, đúng gợi ý
// "flex-start (hoặc center — so sánh 2 cách)" trong tài liệu:
// - "flex-start": ảnh và cột chữ cùng bắt đầu từ mép trên.
// - "center"    : ảnh (cao hơn cột chữ ngắn) sẽ tự căn giữa theo chiều dọc.
const CARD_ALIGN_ITEMS: "flex-start" | "center" = "flex-start";

const COVER_WIDTH = 80;
const COVER_HEIGHT = 110;

export function BookRowCard({ book }: { book: Book }) {
  return (
    <View style={[styles.card, { alignItems: CARD_ALIGN_ITEMS }]}>
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* Cột thông tin: flex:1 để ăn hết phần rộng còn lại sau ảnh bìa.
          height cố định = chiều cao ảnh bìa, để justifyContent 'space-between'
          có đủ khoảng trống mà đẩy giá tiền xuống tận đáy. */}
      <View style={styles.info}>
        <View>
          {/* numberOfLines không phải thuộc tính flexbox, nhưng BẮT BUỘC để tên
              sách dài 2 dòng không đẩy lệch layout — đúng gợi ý của bài tập. */}
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // ảnh bên trái, chữ bên phải
    padding: 12,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  cover: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    borderRadius: 8,
    backgroundColor: "#EEF2F7",
  },
  info: {
    flex: 1, // chiếm hết phần rộng còn lại
    height: COVER_HEIGHT, // bằng chiều cao ảnh -> có "đất" để space-between hoạt động
    flexDirection: "column", // tên/tác giả ở trên, giá ở dưới
    justifyContent: "space-between", // đẩy giá tiền xuống sát đáy cột
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  author: {
    fontSize: 12,
    color: "#5B6B7F",
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
