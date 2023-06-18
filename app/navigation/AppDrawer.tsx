import { createDrawerNavigator } from "@react-navigation/drawer";
import { Catagories, Dashbaord } from "../screens";
import { useAppSelector } from "../hooks";
import { Text } from "native-base";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const categories = useAppSelector((state) => state.category);

  return (
    <Drawer.Navigator
      initialRouteName="Dashbaord"
      screenOptions={{
        headerTitleAlign: "center",
        drawerActiveTintColor: "#4338ca",
      }}
    >
      <Drawer.Screen name="Dashbaord" component={Dashbaord} />
      <Drawer.Screen name="Manage Catagories" component={Catagories} />
    </Drawer.Navigator>
  );
}
