import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home-screen";
import Stable from "../screens/stable-screen";
import Maps from "../screens/maps-screen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarStyle: { display: "none" }}}/>
        <Tab.Screen name="Stable" component={Stable} options={{tabBarStyle: { display: "none" }}}/>
        <Tab.Screen name="Venice" component={Maps} options={{tabBarStyle: { display: "none" }}}/>
    </Tab.Navigator>
  );
}
