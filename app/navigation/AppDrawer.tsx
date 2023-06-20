import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Catagories, Dashbaord } from "../screens";
import { useAppSelector } from "../hooks";

import DynamicCategory from "../screens/DynamicCategory";
import { color } from "react-native-reanimated";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const categories = useAppSelector((state) => state.category);
  const filteredCategories = categories.filter((category) => category.name);
  const [filteredCategoriesCount, setFilteredCategoriesCount] = useState(0);

  useEffect(() => {
    const filteredCategories = categories.filter((category) => category.name);
    setFilteredCategoriesCount(filteredCategories.length);
    console.log({ categories });
  }, [categories]);

  return (
    <Drawer.Navigator
      initialRouteName="Dashbaord"
      screenOptions={{
        headerTitleAlign: "center",
        drawerActiveTintColor: "#4338ca",
        headerTintColor: "#4338ca",
        headerTitleStyle: { color: "black" },
      }}
    >
      <Drawer.Screen name="Dashbaord" component={Dashbaord} />
      <Drawer.Screen name="Manage Catagories" component={Catagories} />
      {categories.map(({ id, fieldIds, name }) => (
        <Drawer.Screen
          key={id}
          name={name || id.toString()}
          component={DynamicCategory}
          initialParams={{ categoryId: id, fieldIds: fieldIds }}
        />
      ))}
    </Drawer.Navigator>
  );
}
