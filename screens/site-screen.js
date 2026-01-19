import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SiteScreen = ({ route, navigation }) => {
  const { site } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} />
      </Pressable>

      <Text style={styles.title}>Sitio guardado</Text>

      <Image source={{ uri: site.image }} style={styles.image} />

      <Text style={styles.coords}>
        {site.latitude.toFixed(5)}, {site.longitude.toFixed(5)}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  back: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  image: { width: "100%", height: 300, borderRadius: 20 },
  coords: { marginTop: 12, color: "#999" },
});

export default SiteScreen;
