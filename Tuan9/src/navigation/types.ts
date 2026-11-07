import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamList = {
  Home: { categoryId?: number } | undefined;
  Categories: undefined;
  Cart: undefined;
  Account: undefined;
};

// Tham số "quay lại đúng chỗ sau khi đăng nhập" (bảo vệ Checkout)
export type AuthRedirect = { redirectTo?: "Checkout"; total?: number } | undefined;

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  BookDetail: { bookId: number };
  Checkout: { total: number };
  Login: AuthRedirect;
  Register: AuthRedirect;
  Wishlist: undefined;
  Orders: undefined;
  EditProfile: undefined;
  Notifications: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
