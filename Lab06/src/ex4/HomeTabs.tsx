
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProductsScreen from './ProductsScreen';
import FavoritesScreen from './FavoritesScreen';

type Props = {
  onSelectProduct: (id: string) => void;
};

type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function HomeTabs({ onSelectProduct }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3451B2',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Products') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Products" options={{ title: 'Products' }}>
        {() => (
          <ProductsScreen onSelectProduct={onSelectProduct} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
    </Tab.Navigator>
  );
}
