
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";

import { useCart, useAuth } from "../store/hooks";
import { confirmDialog } from "../utils/dialog";
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";

type DiscountCode = "SALE10" | "GIAM50K";

export function CartScreen({
  navigation,
}: TabScreenProps<"Cart">) {
  const {
    items,
    totalPrice,
    setQty,
    remove,
  } = useCart();

  const { isLoggedIn } = useAuth();

  // Mã người dùng đang nhập
  const [couponInput, setCouponInput] = useState("");

  // Mã đã được áp dụng thành công
  const [appliedCode, setAppliedCode] =
    useState<DiscountCode | null>(null);

  // Thông báo lỗi khi nhập mã
  const [couponError, setCouponError] = useState("");

  // BT8.C2: Tính số tiền được giảm
  const discount = useMemo(() => {
    if (appliedCode === "SALE10") {
      return Math.round(totalPrice * 0.1);
    }

    if (appliedCode === "GIAM50K") {
      return Math.min(50000, totalPrice);
    }

    return 0;
  }, [appliedCode, totalPrice]);

  // Tổng tiền sau giảm giá
  const finalTotal = Math.max(0, totalPrice - discount);

  // Áp dụng mã giảm giá
  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError("Vui lòng nhập mã giảm giá.");
      return;
    }

    if (code !== "SALE10" && code !== "GIAM50K") {
      setCouponError("Mã giảm giá không hợp lệ.");
      return;
    }

    setAppliedCode(code);
    setCouponInput(code);
    setCouponError("");

  };

  // Hủy mã giảm giá
  const removeCoupon = () => {
    setAppliedCode(null);
    setCouponInput("");
    setCouponError("");
  };

  // BT8.7a: Xóa sản phẩm có xác nhận
  const askRemove = (bookId: number) => {
    const item = items.find(
      (product) => product.bookId === bookId
    );

    if (!item) return;

    confirmDialog(
      "Xóa sản phẩm",
      `Bạn có chắc muốn xóa "${item.title}" khỏi giỏ hàng?`,
      () => remove(bookId)
    );
  };

  // BT8.4 + BT8.C2: Truyền tổng tiền sau giảm sang Checkout
  const goCheckout = () => {
    if (isLoggedIn) {
      navigation.navigate("Checkout", {
        total: finalTotal,
      });
    } else {
      navigation.navigate("Login", {
        redirectTo: "Checkout",
        total: finalTotal,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.bookId)}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onChangeQty={setQty}
            onRemove={askRemove}
          />
        )}
        contentContainerStyle={{
          paddingVertical: 8,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          {/* Khu vực nhập mã giảm giá */}
          <Text style={styles.sectionTitle}>
            Mã giảm giá
          </Text>

          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={couponInput}
              onChangeText={(value) => {
                setCouponInput(value);
                setCouponError("");
              }}
              placeholder="Nhập mã giảm giá"
              autoCapitalize="characters"
              editable={!appliedCode}
            />

            {appliedCode ? (
              <PrimaryButton
                title="Hủy mã"
                variant="outline"
                onPress={removeCoupon}
              />
            ) : (
              <PrimaryButton
                title="Áp dụng"
                onPress={applyCoupon}
              />
            )}
          </View>

          {couponError ? (
            <Text style={styles.error}>
              {couponError}
            </Text>
          ) : null}

          {appliedCode ? (
            <Text style={styles.success}>
              Đã áp dụng mã {appliedCode} thành công!
            </Text>
          ) : null}

          <Text style={styles.hint}>
            SALE10: giảm 10% · GIAM50K: giảm 50.000đ
          </Text>

          {/* Chi tiết thanh toán */}
          <View style={styles.separator} />

          <View style={styles.line}>
            <Text style={styles.muted}>
              Tạm tính
            </Text>

            <Text style={styles.value}>
              {formatPrice(totalPrice)}
            </Text>
          </View>

          <View style={styles.line}>
            <Text style={styles.muted}>
              Giảm giá
            </Text>

            <Text style={styles.discount}>
              -{formatPrice(discount)}
            </Text>
          </View>

          <View style={styles.line}>
            <Text style={styles.total}>
              Tổng cộng
            </Text>

            <Text style={styles.total}>
              {formatPrice(finalTotal)}
            </Text>
          </View>

          <PrimaryButton
            title="Thanh toán"
            onPress={goCheckout}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  footer: {
    backgroundColor: "#fff",
    padding: 14,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.navy,
  },

  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  couponInput: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: colors.text,
    backgroundColor: "#fff",
  },

  error: {
    color: colors.danger,
    fontSize: 13,
  },

  success: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "700",
  },

  hint: {
    color: colors.muted,
    fontSize: 12,
  },

  separator: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 2,
  },

  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  muted: {
    color: colors.muted,
  },

  value: {
    fontWeight: "700",
    color: colors.text,
  },

  discount: {
    fontWeight: "700",
    color: colors.success,
  },

  total: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.navy,
  },
});
