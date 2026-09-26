import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data'; // Lấy dữ liệu sách và giỏ hàng mẫu có sẵn[cite: 13]
import { TabBar, TabKey } from './components/TabBar';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  
  // Quản lý tab đang được chọn (mặc định là 'home')
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {/* Ưu tiên 1: Đang xem chi tiết một cuốn sách */}
        {selectedBook ? (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => {
              // Bấm thêm vào giỏ (nếu cần xử lý thêm)
            }}
          />
        ) : activeTab === 'cart' ? (
          /* Ưu tiên 2: Nếu tab đang chọn là giỏ hàng -> hiển thị CartScreen với dữ liệu mẫu từ data.ts[cite: 13] */
          <CartScreen items={CART_ITEMS} />
        ) : (
          /* Mặc định: Hiển thị màn hình Trang chủ */
          <HomeScreen
            cartCount={CART_ITEMS.length}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab('cart')} // Bấm nút giỏ hàng nổi -> chuyển sang tab 'cart'
          />
        )}

        {/* Thanh Taskbar điều hướng dưới cùng */}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
});