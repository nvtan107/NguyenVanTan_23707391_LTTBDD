
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // Số lượng tạm thời ở component
  const [qty, setQty] = useState(item.quantity);

  // Chờ người dùng ngừng bấm 300ms
  const debouncedQty = useDebounce(qty, 300);

  // Cập nhật Redux sau khi debounce
  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, item.quantity, item.bookId, onChangeQty]);

  // Đồng bộ nếu số lượng thay đổi từ nơi khác
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  // Giới hạn số lượng
  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      {/* Ảnh đại diện sách */}
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      {/* Thông tin sách */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>
          {formatPrice(item.price)}
        </Text>

        <Text style={styles.stock}>
          Còn {item.stock}
        </Text>

        {/* Bộ điều chỉnh số lượng */}
        <View style={styles.quantityContainer}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            style={[
              styles.quantityButton,
              !canDec && styles.disabledButton,
            ]}
            accessibilityLabel="Giảm"
          >
            <Text style={styles.buttonText}>−</Text>
          </Pressable>

          <Text style={styles.quantityText}>{qty}</Text>

          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            style={[
              styles.quantityButton,
              !canInc && styles.disabledButton,
            ]}
            accessibilityLabel="Tăng"
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Xóa sản phẩm */}
      <Pressable
        onPress={() => onRemove(item.bookId)}
        hitSlop={8}
        accessibilityLabel="Xóa khỏi giỏ"
      >
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 5,
    gap: 10,
  },

  cover: {
    width: 54,
    height: 72,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 26,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontWeight: "700",
    color: colors.text,
  },

  price: {
    color: colors.indigo,
    fontWeight: "800",
  },

  stock: {
    color: colors.muted,
    fontSize: 12,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  quantityText: {
    minWidth: 20,
    textAlign: "center",
    color: colors.navy,
    fontSize: 16,
    fontWeight: "800",
  },

  trash: {
    fontSize: 22,
  },
});
