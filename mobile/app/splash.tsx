import { View, Text, StyleSheet } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MomioWorld</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
  },
});
