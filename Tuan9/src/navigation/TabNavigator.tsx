import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "./types";
import { CustomTabBar } from "./CustomTabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CartScreen } from "../screens/CartScreen";
import { AccountScreen } from "../screens/AccountScreen";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ title: "Danh mục" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Giỏ hàng" }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: "Tài khoản" }} />
    </Tab.Navigator>
  );
}
