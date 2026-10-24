
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeTabs from './HomeTabs';
import ProductDetailsScreen from './ProductDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackTabApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <HomeTabs
              onSelectProduct={(id) =>
                navigation.navigate('ProductDetails', { id })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Product Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
