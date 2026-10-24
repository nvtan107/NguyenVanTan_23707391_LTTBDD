
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PRODUCTS, formatPrice } from './ProductData';

type RootStackParamList = {
  Home: undefined;
  ProductDetails: { id: string };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Không tìm thấy sản phẩm.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          ← Quay lại
        </Text>

        <View style={styles.imageBox}>
          <Text style={styles.image}>📱</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          {formatPrice(product.price)}
        </Text>

        <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
        <Text style={styles.description}>
          {product.description}
        </Text>

        <Text style={styles.id}>Mã sản phẩm: {product.id}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  back: {
    fontSize: 16,
    color: '#3451B2',
    marginBottom: 24,
    paddingVertical: 8,
  },
  imageBox: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#E3E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  image: {
    fontSize: 100,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#20243A',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D62828',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20243A',
    marginTop: 28,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
  },
  id: {
    color: '#777777',
    marginTop: 20,
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
