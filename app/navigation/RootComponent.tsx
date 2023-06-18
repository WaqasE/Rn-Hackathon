// RootComponent.tsx
import React from "react";
import { Provider } from "react-redux";
import AppDrawer from "./AppDrawer";
import store from "../store";

export default function RootComponent() {
  return (
    <Provider store={store}>
      <AppDrawer />
    </Provider>
  );
}
