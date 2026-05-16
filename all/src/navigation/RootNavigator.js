import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";

import MainTabNavigator from "./MainTabNavigator";
import AdminTabNavigator from "./AdminTabNavigator";

import ProfileDetailsScreen from "../screens/ProfileDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";
import ChatScreen from "../screens/ChatScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PremiumScreen from "../screens/PremiumScreen";
import VerificationSubmitScreen from "../screens/VerificationSubmitScreen";

import ProfileCreateEditScreen from "../screens/ProfileCreateEditScreen";
import SearchFilterScreen from "../screens/SearchFilterScreen";
import InterestRequestsScreen from "../screens/InterestRequestsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#FFF7F2",
        },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />

      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="AdminTabs"
        component={AdminTabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />

      <Stack.Screen
        name="ProfileCreateEdit"
        component={ProfileCreateEditScreen}
      />

      <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />

      <Stack.Screen
        name="InterestRequests"
        component={InterestRequestsScreen}
      />

      <Stack.Screen
        name="VerificationSubmit"
        component={VerificationSubmitScreen}
      />

      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />

      <Stack.Screen name="Chat" component={ChatScreen} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />

      <Stack.Screen name="Premium" component={PremiumScreen} />
    </Stack.Navigator>
  );
}