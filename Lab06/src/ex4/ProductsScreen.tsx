
import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PRODUCTS, formatPrice } from './ProductData';
import type { Product } from './ProductData';

type Props = {
  onSelectProduct: (id: string) => void;
};

export default function ProductsScreen({ onSelectProduct }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Danh sách sản phẩm</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Product }) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectProduct(item.id)}
          >
            <View style={styles.iconBox}>
              <Text style={styles.phoneIcon}>📱</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {formatPrice(item.price)}
              </Text>
              <Text style={styles.detail}>Xem chi tiết →</Text>
            </View>
          </Pressable>
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
    fontSize: 23,
    fontWeight: 'bold',
    color: '#20243A',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E3E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  phoneIcon: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#20243A',
  },
  price: {
    color: '#D62828',
    fontWeight: 'bold',
    marginTop: 6,
  },
  detail: {
    color: '#3451B2',
    marginTop: 6,
  },
});
