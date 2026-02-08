import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta es nuestra historia</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/tickets")}
      >
        <Text style={styles.buttonText}>Ir a Tickets</Text>
      </Pressable>

      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Familiares</Text>
        </Pressable>
        <Pressable style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Tickets</Text>
        </Pressable>
        <Pressable style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Establo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
    backgroundColor: "#8fd3ff",
  },
  title: {
    fontSize: 20,
    fontFamily: "GravitasOne",
    fontWeight: "bold",
    color: "#000000",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 24, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  bottomButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bottomButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
