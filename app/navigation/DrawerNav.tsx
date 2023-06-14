import { createDrawerNavigator } from "@react-navigation/drawer";
import { Catagories, Dashbaord } from "../screens";
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashbaord" component={Dashbaord} />
      <Drawer.Screen name="Manage Catagories" component={Catagories} />
    </Drawer.Navigator>
  );
}


