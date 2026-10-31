import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";
export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { totalQuantity } = useCart();
  
  // Emoji tương ứng với từng màn hình
  const emojiMap: Record<string, string> = {
    Home: "🏠",
    Categories: "🗂️",
    Cart: "🛒",
    Account: "👤",
  };

  // Tạo danh sách các tab từ state.routes
  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: emojiMap[route.name] ?? "📱",
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));

  // Xử lý khi người dùng nhấn vào một tab
  const onPress = (key: string) => {
    const route = state.routes.find((item) => item.key === key);

    if (!route) return;

    const isFocused = state.routes[state.index].key === key;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <TabBar
      items={items}
      activeKey={state.routes[state.index].key}
      onPress={onPress}
    />
  );
}