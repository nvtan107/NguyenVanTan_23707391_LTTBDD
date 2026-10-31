import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "./types";
import { CustomTabBar } from "./CustomTabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CartScreen } from "../screens/CartScreen";
import  AccountScreen  from "../screens/AccountScreen";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  // TODO BT7.1b: sau khi viết xong CustomTabBar, thêm vào Tab.Navigator prop:
  //   tabBar={(props) => <CustomTabBar {...props} />}
  // (Hiện đang dùng thanh tab MẶC ĐỊNH của thư viện — chưa phải giao diện tự dựng.)
  void CustomTabBar;
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
  
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Danh mục" }}
      />
  
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />
  
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
}
