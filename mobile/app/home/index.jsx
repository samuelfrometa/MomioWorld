import { View, Text, StyleSheet, Dimensions, Pressable, Animated } from "react-native";
import { useEffect, useState, useRef } from "react";
import Svg, { Path } from "react-native-svg";

const FULL_TEXT = `Para la persona a la que más amo: 

Estar a tu lado me hace ser una persona muy feliz.

Cuanto más tiempo juntos, más te amo.`;
const START_DATE = new Date("2025-02-10T00:00:00");

export default function Home() {
  const [started, setStarted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [timeDiff, setTimeDiff] = useState(getTimeDiff());

  const heartTranslateX = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(FULL_TEXT.slice(0, index));
      index++;
      if (index > FULL_TEXT.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setTimeDiff(getTimeDiff());
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  const handleHeartPress = () => {
    setStarted(true);

    // animar el corazón hacia la derecha
    Animated.spring(heartTranslateX, {
      toValue: width * 0.45,
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();

    // mostrar contenido después de un pequeño delay
    setTimeout(() => {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 200);
  };

  return (
    <View style={styles.container}>
      {!started ? (
        <View style={styles.centerContainer}>
          <Pressable onPress={handleHeartPress}>
            <Svg width={150} height={150} viewBox="0 0 24 24">
              <Path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#ff3366"
              />
            </Svg>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.topContent}>
            <Animated.View
              style={[
                styles.textContainer,
                { opacity: contentOpacity },
              ]}
            >
              <Text style={styles.storyText}>
                {displayedText}
                {displayedText.length < FULL_TEXT.length && (
                  <Text style={styles.cursor}>_</Text>
                )}
              </Text>

              <Text style={styles.counterIntro}>Mi amor por ti empezó hace...</Text>

              <Text style={styles.counterText}>
                {timeDiff.days} días {timeDiff.hours} horas {timeDiff.minutes} minutos {timeDiff.seconds} segundos
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                transform: [{ translateX: heartTranslateX }],
              }}
            >
              <Svg width={80} height={80} viewBox="0 0 24 24">
                <Path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#ff3366"
                />
              </Svg>
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.bottomBar,
              { opacity: contentOpacity },
            ]}
          >
            <Text style={styles.bottomBarText}>10 de Febrero del 2025</Text>
          </Animated.View>
        </>
      )}
    </View>
  );
}

function getTimeDiff() {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe0e6",
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContent: {
    flexDirection: "row",
    width: width * 0.9,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  storyText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
  cursor: {
    fontSize: 18,
    color: "#ff3366",
    fontWeight: "bold",
  },
  counterIntro: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff3366",
    marginTop: 10,
    marginBottom: 5,
  },
  counterText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d91a60",
  },
  bottomBar: {
    width: "90%",
    paddingVertical: 14,
    backgroundColor: "#ff3366",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  bottomBarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
