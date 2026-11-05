import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { TabNavigator } from "./TabNavigator";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "700" as const },
};

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Chi tiết sách" }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh toán" }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Đăng nhập", presentation: "modal" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Đăng ký", presentation: "modal" }} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: "Yêu thích" }} />
    </Stack.Navigator>
  );
}
