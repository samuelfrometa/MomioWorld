import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Splash from "./splash";

export default function Layout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <Splash />;
  }

  return <Stack />;
}
