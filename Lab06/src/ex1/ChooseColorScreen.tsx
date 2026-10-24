
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Phone, ColorKey } from '../types';
import { PHONE_COLORS, COLOR_ORDER } from '../data/phones';
import { colors, formatPrice } from '../theme';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  'ChooseColor'
> & {
  phone: Phone;
};

export function ChooseColorScreen({
  navigation,
  route,
  phone,
}: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const [line1, line2] = phone.name.split(' - ');
  const shown = picked ?? phone.defaultColor;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>
                  {PHONE_COLORS[picked].label}
                </Text>
              </Text>

              <Text style={styles.small}>
                Cung cấp bởi{' '}
                <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>

              <Text style={styles.price}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.filter((key) => phone.colors.includes(key)).map(
            (key) => (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  picked === key && styles.swatchOn,
                ]}
              />
            )
          )}
        </View>

        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate({
              name: 'Product',
              params: { color: picked },
              merge: true,
            })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    minHeight: 145,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  thumb: {
    width: 100,
    height: 125,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 4,
  },
  small: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  price: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 3,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 12,
  },
  hint: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  swatches: {
    alignItems: 'center',
    gap: 7,
  },
  swatch: {
    width: 60,
    height: 39,
    borderWidth: 1,
    borderColor: '#AAAAAA',
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  doneBtn: {
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 4,
  },
  doneText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
