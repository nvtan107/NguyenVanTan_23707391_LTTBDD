
export type Product = {
    id: string;
    name: string;
    price: number;
    oldPrice: number;
    rating: number;
    reviewCount: number;
    supplier: string;
    badge: string;
    colors: string[];
    defaultColor: string;
    description: string;
    favorite: boolean;
  };
  
  export const PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'Điện Thoại Vsmart Joy 3 - Màu bạc',
      price: 1790000,
      oldPrice: 1790000,
      rating: 5,
      reviewCount: 828,
      supplier: 'Tiki Tradding',
      badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
      colors: ['silver', 'red', 'black', 'blue'],
      defaultColor: 'silver',
      description: 'Điện thoại Vsmart Joy 3 màu bạc - hàng chính hãng.',
      favorite: true,
    },
    {
      id: '2',
      name: 'Điện Thoại Vsmart Joy 3 - Màu đỏ',
      price: 1790000,
      oldPrice: 1790000,
      rating: 5,
      reviewCount: 828,
      supplier: 'Tiki Tradding',
      badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
      colors: ['silver', 'red', 'black', 'blue'],
      defaultColor: 'red',
      description: 'Điện thoại Vsmart Joy 3 màu đỏ - hàng chính hãng.',
      favorite: false,
    },
    {
      id: '3',
      name: 'Điện Thoại Vsmart Joy 3 - Màu đen',
      price: 1790000,
      oldPrice: 1790000,
      rating: 5,
      reviewCount: 828,
      supplier: 'Tiki Tradding',
      badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
      colors: ['silver', 'red', 'black', 'blue'],
      defaultColor: 'black',
      description: 'Điện thoại Vsmart Joy 3 màu đen - hàng chính hãng.',
      favorite: true,
    },
    {
      id: '4',
      name: 'Điện Thoại Vsmart Joy 3 - Màu xanh',
      price: 1790000,
      oldPrice: 1790000,
      rating: 5,
      reviewCount: 828,
      supplier: 'Tiki Tradding',
      badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
      colors: ['silver', 'red', 'black', 'blue'],
      defaultColor: 'blue',
      description: 'Điện thoại Vsmart Joy 3 màu xanh - hàng chính hãng.',
      favorite: false,
    },
  ];
  
  export function formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' đ';
  }
  