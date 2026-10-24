
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PRODUCTS, formatPrice } from './ProductData';

export default function FavoritesScreen() {
  const favoriteProducts = PRODUCTS.filter(
    (product) => product.favorite
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Sản phẩm yêu thích</Text>

      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Chưa có sản phẩm yêu thích.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heart}>♥</Text>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {formatPrice(item.price)}
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
    fontSize: 23,
    fontWeight: 'bold',
    color: '#20243A',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  heart: {
    fontSize: 28,
    color: '#E53935',
    marginRight: 14,
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
  empty: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 30,
  },
});
