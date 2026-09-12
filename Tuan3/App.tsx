// GIỜ 1 — Nền tảng Flexbox & Layout đơn giản
// Minh hoạ riêng: Bài 1 (Header) + Bài 2 (BookRowCard) + Thử thách giờ 1
// (Header cố định trên cùng + danh sách Book Card xếp chồng theo cột bên dưới).
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { BookRowCard } from './components/BookRowCard';
import { BOOKS } from './data';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      <Header />
      {/* flex:1 cho vùng nội dung -> chiếm hết phần còn lại của màn hình sau Header,
          đúng yêu cầu "Thử thách giờ 1". */}

<ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục (flexWrap)</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Lưới sách (2 cột)</Text>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log('Mở sách', id)} />
      </ScrollView>

      {/* <ScrollView contentContainerStyle={styles.list}>
        {BOOKS.map((book) => (
          <BookRowCard key={book.id} book={book} />
        ))}
      </ScrollView> */}
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((n) => n + 1)} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 12, gap: 10 },
  content: { padding: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10, marginTop: 4 },
});
