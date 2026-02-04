import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Splash from "./splash";

export default function Layout() {
  const [ready, setReady] = useState(false);

  const [fontsLoaded] = useFonts({
    GravitasOne: require("../assets/fonts/Gravitas_One/GravitasOne-Regular.ttf"),
    LeckerliOne: require("../assets/fonts/Leckerli_One/LeckerliOne-Regular.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!ready || !fontsLoaded) {
    return <Splash />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
