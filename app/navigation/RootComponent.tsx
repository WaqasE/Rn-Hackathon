// RootComponent.tsx
import React from "react";
import { Provider } from "react-redux";
import DrawerScreen from "./DrawerNav";
import store from "../store";

export default function RootComponent() {
  return (
    <Provider store={store}>
      <DrawerScreen />
    </Provider>
  );
}
