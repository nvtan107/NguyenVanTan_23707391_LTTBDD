// GIỜ 4 — Bài tập 1: Màn hình Trang chủ hoàn chỉnh
// Ghép: Header (cố định, KHÔNG cuộn) + ScrollView (Chips + Grid, CUỘN được)
// + FloatingCartButton (absolute, cùng cấp với ScrollView, KHÔNG cuộn theo).
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { BOOKS } from "../data";

export function HomeScreen({
  cartCount,
  onPressBook,
  onPressCart,
}: {
  cartCount: number;
  onPressBook: (id: number) => void;
  onPressCart: () => void;
}) {
  return (
    // flex:1 + position mặc định 'relative' -> làm containing block cho
    // FloatingCartButton absolute bên dưới, thoát khỏi mọi quan hệ cha khác.
    <View style={styles.screen}>
      <Header />

      <ScrollView
        style={styles.scroll} // flex:1 bắt buộc trên chính ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={onPressBook} />
      </ScrollView>

      {/* Nút nổi nằm NGOÀI ScrollView, song song với nó -> không bị cuộn theo
          nội dung, luôn nổi cố định ở góc màn hình như đúng yêu cầu. */}
      <FloatingCartButton  count={cartCount} onPress={onPressCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    // paddingBottom đủ lớn để phần tử cuối của Grid không bị FloatingCartButton
    // (cao ~80px tính cả khoảng cách đáy) hoặc TabBar (64px, ở App.tsx) che mất.
    paddingBottom: 240,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
});
