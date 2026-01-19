import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChoiceScreen from "../screens/choice-screen";
import FamilyScreen from "../screens/family-screen";  
import Tabs from "./tabs";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Choice"
        component={ChoiceScreen}
      />
      <Stack.Screen name="Family" component={FamilyScreen} />
      <Stack.Screen
        name="Main"
        component={Tabs}
      />
    </Stack.Navigator>
  );
}
