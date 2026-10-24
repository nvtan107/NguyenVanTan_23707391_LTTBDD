
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#3451B2',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#3451B2',
          drawerInactiveTintColor: '#555555',
          drawerActiveBackgroundColor: '#E3E9FF',
          drawerLabelStyle: {
            marginLeft: -12,
            fontSize: 15,
          },
          drawerIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            } else {
              iconName = 'settings-outline';
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
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />

        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
