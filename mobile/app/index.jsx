import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const images = [
  require("../assets/images/imagen_1.jpeg"),
  require("../assets/images/imagen_2.jpeg"),
  require("../assets/images/imagen_3.jpeg"),
  require("../assets/images/imagen_4.jpeg"),
  require("../assets/images/imagen_5.jpeg"),
  require("../assets/images/imagen_6.jpeg"),
  require("../assets/images/imagen_7.jpeg"),
];

export default function Splash() {
  const router = useRouter();

  const shuffledImages = useMemo(() => {
    return [...images].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <LinearGradient
      colors={["#e6f4ff", "#8fd3ff", "#4bb3ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.polaroidContainer}>
          {shuffledImages.slice(0, 6).map((img, index) => (
            <View
              key={index}
              style={[
                styles.polaroid,
                styles[`p${index + 1}`],
              ]}
            >
              <View style={styles.photoWrapper}>
                <Image
                  source={img}
                  style={styles.photo}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.title}>MomioWorld</Text>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  polaroidContainer: {
    marginTop: 70,
    width: "100%",
    height: 650,
    alignItems: "center",
  },

  polaroid: {
    position: "absolute",
    width: "50%",
    height: 300,
    backgroundColor: "#ffffff",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  photoWrapper: {
    flex: 1,
    width: "100%",
    borderRadius: 7,
    overflow: "hidden",
  },

  photo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  p1: {
    top: 0,
    left: -35,
    transform: [{ rotate: "-8deg" }],
  },

  p2: {
    top: 35,
    transform: [{ rotate: "0deg" }],
  },

  p3: {
    top: 0,
    right: -35,
    transform: [{ rotate: "8deg" }],
  },

  p4: {
    top: 260,
    left: -35,
    transform: [{ rotate: "-6deg" }],
  },

  p5: {
    top: 300,
    transform: [{ rotate: "0deg" }],
  },

  p6: {
    top: 260,
    right: -35,
    transform: [{ rotate: "6deg" }],
  },

  bottomRow: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontFamily: "GravitasOne",
    color: "#ffffff",
  },

  arrowButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  arrowText: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "bold",
  },
});