
import { Book } from "../types";

// Chuẩn hóa chuỗi: bỏ dấu tiếng Việt, chuyển chữ thường
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export const PRICE_RANGES: {
  key: Exclude<PriceRange, null>;
  label: string;
}[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

// Bài 7.7: lọc sách theo từ khóa
export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}
const inRange = (price: number, r: PriceRange): boolean => {
  if (r === null) return true;

  switch (r) {
    case "lt100":
      return price < 100000;

    case "100to300":
      return price >= 100000 && price <= 300000;

    case "gt300":
      return price > 300000;

    default:
      return true;
  }
};

export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const keyword = normalize(f.keyword);

  return books.filter((b) => {
    const matchKeyword =
      keyword === "" ||
      normalize(b.title).includes(keyword) ||
      normalize(b.author).includes(keyword);

    const matchCategory =
      f.categoryId === null || b.categoryId === f.categoryId;

    const matchPrice = inRange(b.price, f.priceRange);

    return matchKeyword && matchCategory && matchPrice;
  });
}
