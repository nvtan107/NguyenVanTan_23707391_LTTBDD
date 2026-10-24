export const colors = {
    red: "#E53A2F", blue: "#4F63C8", navy: "#0B1F5C", text: "#1F2430",
    muted: "#6B7280", line: "#D8DCE3", bg: "#F4F5F7", grey: "#C4C4C4", star: "#F5C518",
  };
  // 1790000 -> "1.790.000 đ"
  export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  