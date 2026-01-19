import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = 420;
const SPACING = 16;

const DATA = [
  {
    id: "1",
    type: "family",
    name: "Mamá",
    birthDate: "1975-03-12",
    age: 49,
  },
  {
    id: "2",
    type: "family",
    name: "Papá",
    birthDate: "1972-09-02",
    age: 52,
  },
  {
    id: "3",
    type: "family",
    name: "Hermana",
    birthDate: "2003-06-20",
    age: 21,
  },
  { id: "add", type: "add" },
];

const Home = ({ navigation }) => {
  const [selectedFamily, setSelectedFamily] = React.useState(DATA[0]);

  const renderCard = ({ item }) => {
    if (item.type === "add") {
      return (
        <Pressable style={[styles.card, styles.addCard, styles.addDashed]}>
          <Ionicons name="add" size={56} color="#4d8aed" />
        </Pressable>
      );
    }

    return (
      <Pressable style={styles.card} onPress={() => navigation.navigate("Family", { family: item })}>
        <View style={styles.cardContent}>
          <Ionicons name="person-circle" size={160} color="#4d8aed" />
          <Text style={styles.cardName}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.getParent()?.navigate("Choice")}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Ionicons name="arrow-back" size={22} color="#000" />
        </Pressable>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Este es tu hogar</Text>
          <View style={styles.titleLine} />
          <Text style={styles.subtitle}>Aquí viven los que quieres</Text>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Información del familiar</Text>

          {selectedFamily?.type === "family" ? (
            <>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={18} color="#4d8aed" />
                <Text style={styles.infoText}>{selectedFamily.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={18} color="#4d8aed" />
                <Text style={styles.infoText}>
                  Nacimiento: {selectedFamily.birthDate}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="time" size={18} color="#4d8aed" />
                <Text style={styles.infoText}>Edad: {selectedFamily.age} años</Text>
              </View>

            </>
          ) : (
            <Text style={styles.infoEmpty}>Selecciona un familiar</Text>
          )}
        </View>

        <Pressable style={styles.add}>
          <Text style={styles.addText}>AÑADIR FAMILIAR</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  backButtonPressed: { backgroundColor: "#eee" },

  titleContainer: { marginLeft: 16 },

  title: { fontSize: 22, fontWeight: "800", color: "#4d8aed" },

  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: "#4d8aed",
    borderRadius: 2,
    marginVertical: 4,
  },

  subtitle: { fontSize: 14, color: "#999" },

  content: { marginTop: 16 },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: SPACING,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  cardContent: { alignItems: "center" },

  cardName: { marginTop: 12, fontWeight: "700", fontSize: 18 },

  addCard: {
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  addDashed: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#bbb",
    borderStyle: "dashed",
  },

  infoBox: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 3,
  },

  infoTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
    color: "#4d8aed",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },

  infoText: { marginLeft: 8, fontSize: 15 },

  infoEmpty: { color: "#999", textAlign: "center" },

  add: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#4d8aed",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: { color: "#fff", fontWeight: "700", letterSpacing: 0.5 },
});

export default Home;
