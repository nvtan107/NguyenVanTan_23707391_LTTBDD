// 389000 -> "389.000 đ"
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";

// Bỏ dấu tiếng Việt để "nha gia" tìm ra "Nhà Giả Kim"

export const normalize = (value: string): string => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
};
