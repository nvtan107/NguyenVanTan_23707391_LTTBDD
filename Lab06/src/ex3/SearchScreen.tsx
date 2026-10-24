
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ITEMS = [
  { id: '1', name: 'Sản phẩm 1' },
  { id: '2', name: 'Sản phẩm 2' },
  { id: '3', name: 'Điện thoại Samsung' },
  { id: '4', name: 'Điện thoại iPhone' },
  { id: '5', name: 'Tai nghe Bluetooth' },
];

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');

  const filteredItems = ITEMS.filter((item) =>
    item.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Tìm kiếm</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên cần tìm..."
        value={keyword}
        onChangeText={setKeyword}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <Text style={styles.result}>
        Tìm thấy {filteredItems.length} kết quả
      </Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.empty}>Không tìm thấy kết quả.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20243A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9DDE8',
    fontSize: 16,
  },
  result: {
    color: '#777777',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#20243A',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777777',
  },
});
