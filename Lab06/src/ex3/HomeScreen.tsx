
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ITEMS = [
  { id: '1', name: 'Sản phẩm 1', description: 'Mô tả sản phẩm thứ nhất' },
  { id: '2', name: 'Sản phẩm 2', description: 'Mô tả sản phẩm thứ hai' },
  { id: '3', name: 'Sản phẩm 3', description: 'Mô tả sản phẩm thứ ba' },
  { id: '4', name: 'Sản phẩm 4', description: 'Mô tả sản phẩm thứ tư' },
  { id: '5', name: 'Sản phẩm 5', description: 'Mô tả sản phẩm thứ năm' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Danh sách sản phẩm</Text>

      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.number}>
              <Text style={styles.numberText}>{item.id}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
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
    paddingBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  number: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#3451B2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20243A',
  },
  description: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },
});
