import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { PaymentOption } from "../components/PaymentOption";
import { TodoBox } from "../components/TodoBox";
import { createOrder } from "../services/orderService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { showMessage } from "../utils/dialog";
import { validatePhone, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { PaymentMethod } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { isLoggedIn, user } = useAuth();
  const { items, clear } = useCart();
  const total = route.params.total;

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lớp bảo vệ — CÓ SẴN
  useEffect(() => {
    if (!isLoggedIn) navigation.replace("Login", { redirectTo: "Checkout", total });
  }, [isLoggedIn, navigation, total]);

 const errors = {
  name: validateRequired("họ tên người nhận")(name),
  phone: validatePhone(phone),
  address: validateRequired("địa chỉ giao hàng")(address),
};

const valid =
  !errors.name &&
  !errors.phone &&
  !errors.address &&
  items.length > 0;

const submit = async () => {
  // Bước 1: Hiển thị lỗi nếu người dùng chưa nhập đúng
  setTouched(true);

  // Không gửi nếu form chưa hợp lệ hoặc chưa đăng nhập
  if (!valid || !user) return;

  // Bước 2: Bật trạng thái loading và xóa lỗi cũ
  setLoading(true);
  setSubmitError(null);

  try {
    // Bước 3: Gửi đơn hàng lên server
    await createOrder({
      userId: user.id,

      items: items.map((i) => ({
        bookId: i.bookId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),

      total,

      address: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      },

      paymentMethod: payment,
    });

    // Bước 4: Chỉ xóa giỏ khi đặt hàng thành công
    clear();

    // Bước 5: Hiển thị thông báo thành công và quay về Home
    showMessage(
      "Đặt hàng thành công 🎉",
      "Cảm ơn bạn đã mua sắm tại BookStore!",
      () => navigation.navigate("Tabs", { screen: "Home" })
    );

  } catch (e) {
    // Bước 6: Nếu lỗi thì giữ nguyên giỏ hàng
    setSubmitError(getErrorMessage(e));

  } finally {
    // Bước 7: Tắt loading dù thành công hay thất bại
    setLoading(false);
  }
};

  if (!isLoggedIn) return null;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* CÓ SẴN: tóm tắt đơn hàng */}
        <Text style={styles.h}>Đơn hàng ({items.length} sản phẩm)</Text>
        <View style={styles.summary}>
          {items.map((i) => (
            <View key={i.bookId} style={styles.sumRow}>
              <Text style={styles.sumTitle} numberOfLines={1}>{i.title} × {i.quantity}</Text>
              <Text style={styles.sumPrice}>{formatPrice(i.price * i.quantity)}</Text>
            </View>
          ))}
          <View style={[styles.sumRow, styles.sumTotal]}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        <Text style={styles.h}>Địa chỉ giao hàng</Text>
        <FormField
  label="Họ tên người nhận"
  value={name}
  onChangeText={setName}
  error={touched ? errors.name : null}
  autoCapitalize="words"
/>

<FormField
  label="Số điện thoại"
  value={phone}
  onChangeText={setPhone}
  error={touched ? errors.phone : null}
  keyboardType="phone-pad"
/>

<FormField
  label="Địa chỉ"
  value={address}
  onChangeText={setAddress}
  error={touched ? errors.address : null}
  autoCapitalize="sentences"
  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
/>

        <Text style={styles.h}>Phương thức thanh toán</Text>
        <PaymentOption
  label="Thanh toán khi nhận hàng (COD)"
  selected={payment === "cod"}
  onPress={() => setPayment("cod")}
/>

<PaymentOption
  label="Chuyển khoản ngân hàng"
  hint="Chỉ minh hoạ giao diện"
  selected={payment === "bank"}
  onPress={() => setPayment("bank")}
/>

        {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
        {/* Nút đã nối sẵn: bị khoá cho đến khi bạn làm xong BT9.1a */}
        <PrimaryButton title="Xác nhận đặt hàng" onPress={submit} loading={loading} disabled={!valid} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  h: { fontSize: 16, fontWeight: "800", color: colors.navy, marginTop: 6 },
  summary: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12, gap: 6 },
  sumRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  sumTitle: { flex: 1, color: colors.text },
  sumPrice: { fontWeight: "700", color: colors.text },
  sumTotal: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 8, marginTop: 4 },
  totalLabel: { fontWeight: "800", color: colors.navy },
  totalValue: { fontWeight: "800", color: colors.indigo, fontSize: 18 },
  error: { color: colors.danger, textAlign: "center" },
});
