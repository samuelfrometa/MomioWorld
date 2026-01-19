import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const FamilyScreen = ({ route, navigation }) => {
  const { family } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
        styles.backButton,
        pressed && styles.backButtonPressed,
        ]}
      >
        <Ionicons name="arrow-back" size={22} color="#000" />
      </Pressable>

      <Text style={styles.title}>{family.name}</Text>

      <View style={styles.card}>
        <Text style={styles.row}>Nacimiento: {family.birthDate}</Text>
        <Text style={styles.row}>Edad: {family.age} años</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  back: { marginBottom: 16 },
  title: { marginTop: 20, fontSize: 26, fontWeight: "800", color: "#4d8aed" },
  card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 4,
  },
  row: { fontSize: 16, marginBottom: 8 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});

export default FamilyScreen;
