
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Phone, ColorKey } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Stars } from '../components/Stars';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked: ColorKey | undefined = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>
            (Xem {phone.reviewCount} đánh giá)
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>
            {formatPrice(phone.oldPrice)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <Text style={styles.question}>ⓘ</Text>
        </View>

        <Pressable
          style={styles.chooseBtn}
          onPress={() =>
            navigation.navigate('ChooseColor', { color: picked })
          }
        >
          <Text style={styles.chooseText}>
            {phone.colors.length} MÀU-CHỌN {picked ? 'LOẠI' : 'MÀU'}
          </Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.buyBtn}
        onPress={() => {}}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  imageWrap: {
    flex: 1,
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    paddingBottom: 12,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  review: {
    color: colors.text,
    fontSize: 12,
    marginLeft: 12,
  },
  price: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  oldPrice: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 12,
    textDecorationLine: 'line-through',
  },
  badge: {
    color: colors.red,
    fontSize: 10,
    fontWeight: 'bold',
  },
  question: {
    color: colors.muted,
    marginLeft: 6,
  },
  chooseBtn: {
    height: 38,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseText: {
    fontSize: 12,
    color: colors.text,
  },
  arrow: {
    position: 'absolute',
    right: 12,
    fontSize: 18,
    color: colors.text,
  },
  buyBtn: {
    height: 44,
    borderRadius: 6,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
