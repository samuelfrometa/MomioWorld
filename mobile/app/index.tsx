import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router";

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>MUNDO</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    marginTop: "50",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
    color: "#000",
  },
});
