import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

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
  const shuffledImages = useMemo(() => {
    return [...images].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <LinearGradient
      colors={["#e6f4ff", "#8fd3ff", "#4bb3ff"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.polaroidContainer}>

          <View style={[styles.polaroid, styles.p1]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[0]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

          <View style={[styles.polaroid, styles.p2]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[1]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

          <View style={[styles.polaroid, styles.p3]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[2]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

          <View style={[styles.polaroid, styles.p4]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[3]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

          <View style={[styles.polaroid, styles.p5]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[4]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

          <View style={[styles.polaroid, styles.p6]}>
            <View style={styles.photoWrapper}>
              <Image source={shuffledImages[5]} style={styles.photo} resizeMode="cover" />
            </View>
          </View>

        </View>

        <Link href="/" asChild>
          <Text style={styles.title}>MomioWorld</Text>
        </Link>

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
    alignItems: "center",
    paddingBottom: 50,
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
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },

  photoWrapper: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
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

  title: {
    marginTop: 10,
    fontSize: 32,
    fontFamily: "GravitasOne",
    color: "#000000",
  },
});
