import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart, clearCart, decrease, removeFromCart, selectCartItems, selectCartTotal } from "../store/cartSlice";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}><Text style={styles.title}>🛒 Giỏ hàng</Text></View>
      <FlatList
        data={items}
        keyExtractor={(i) => i.bookId}
        contentContainerStyle={{ padding: 14, flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row} testID={`cart-${item.bookId}`}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decrease(item.bookId))} testID={`dec-${item.bookId}`}><Text style={styles.qtyText}>−</Text></TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(addToCart({ id: item.bookId, title: item.title, price: item.price }))} testID={`inc-${item.bookId}`}><Text style={styles.qtyText}>＋</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.bookId))}><Text style={{ fontSize: 18 }}>🗑️</Text></TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total} testID="cart-total">Tổng cộng: {formatPrice(total)}</Text>
        <TouchableOpacity style={[styles.clear, items.length === 0 && { opacity: 0.4 }]} disabled={items.length === 0} onPress={() => dispatch(clearCart())} testID="clear-cart">
          <Text style={styles.clearText}>Xoá giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.line },
  name: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "700" },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },
  qtyText: { fontSize: 18, fontWeight: "800", color: colors.navy },
  qty: { minWidth: 18, textAlign: "center", fontWeight: "800" },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", padding: 14, borderTopWidth: 1, borderTopColor: colors.line },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  clear: { borderWidth: 1.5, borderColor: colors.red, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  clearText: { color: colors.red, fontWeight: "800" },
});
