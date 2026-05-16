import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MatrimonyProvider } from "./src/context/MatrimonyContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <MatrimonyProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </MatrimonyProvider>
  );
}