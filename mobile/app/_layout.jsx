import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    GravitasOne: require("../assets/fonts/Gravitas_One/GravitasOne-Regular.ttf"),
    LeckerliOne: require("../assets/fonts/Leckerli_One/LeckerliOne-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
