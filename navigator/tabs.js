import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home-screen";
import Stable from "../screens/stable-screen";
import Venice from "../screens/venice-screen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarStyle: { display: "none" }}}/>
        <Tab.Screen name="Stable" component={Stable} />
        <Tab.Screen name="Venice" component={Venice} />
    </Tab.Navigator>
  );
}
