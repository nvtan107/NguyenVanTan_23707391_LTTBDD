export type ColorKey = 'silver' | 'red' | 'black' | 'blue';

export interface Phone {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  badge: string;
  colors: ColorKey[];
  defaultColor: ColorKey;
}