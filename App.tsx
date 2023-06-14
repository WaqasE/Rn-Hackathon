import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "./app/theme/";
import RootComponent from "./app/navigation/RootComponent";
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <RootComponent />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
