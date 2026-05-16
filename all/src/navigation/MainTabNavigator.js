import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ServicesScreen from "../screens/ServicesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import { COLORS } from "../constants/colors";

const Tab = createBottomTabNavigator();

function TabIcon({ focused, icon, label }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons
        name={focused ? icon : `${icon}-outline`}
        size={22}
        color={focused ? COLORS.primary : COLORS.muted}
      />
      <Text style={[styles.tabText, focused && { color: COLORS.primary }]}>
        {label}
      </Text>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" label="Home" />
          ),
        }}
      />

      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="heart" label="Matches" />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="bookmark" label="Saved" />
          ),
        }}
      />

      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="business" label="Services" />
          ),
        }}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="person" label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: COLORS.white,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  tabText: {
    fontSize: 11,
    marginTop: 3,
    color: COLORS.muted,
    fontWeight: "700",
  },
});