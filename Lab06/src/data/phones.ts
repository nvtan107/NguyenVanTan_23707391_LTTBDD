
import type { ColorKey, Phone } from '../types';

export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: number }
> = {
  silver: {
    label: 'bạc',
    hex: '#C9EEFA',
    image: require('../../assets/phones/silver.png'),
  },
  red: {
    label: 'đỏ',
    hex: '#E53A2F',
    image: require('../../assets/phones/red.png'),
  },
  black: {
    label: 'đen',
    hex: '#000000',
    image: require('../../assets/phones/black.png'),
  },
  blue: {
    label: 'xanh',
    hex: '#2A4494',
    image: require('../../assets/phones/blue.png'),
  },
};

export const COLOR_ORDER: ColorKey[] = [
  'silver',
  'red',
  'black',
  'blue',
];

export const PHONES: Phone[] = [
  {
    id: '1',
    name: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng',
    price: 1790000,
    oldPrice: 1790000,
    rating: 5,
    reviewCount: 828,
    supplier: 'Tiki Tradding',
    badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
    colors: COLOR_ORDER,
    defaultColor: 'blue',
  },
];
