import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* ---------- DATA ---------- */
/* Las dos primeras cards son especiales */
const DATA = [
  { id: "add", type: "add" },
  { id: "empty", type: "empty" },
];

/* ---------- LAYOUT ---------- */
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = 420;
const SPACING = 16;

/* ---------- COMPONENT ---------- */

const Home = ({ navigation }) => {
  const renderCard = ({ item }) => {
    if (item.type === "add") {
      return (
        <Pressable style={[styles.card, styles.addCard]}>
          <Ionicons name="add" size={56} color="#4d8aed" />
        </Pressable>
      );
    }

    if (item.type === "empty") {
      return <View style={[styles.card, styles.emptyCard]} />;
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardLabel}>
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
      </View>
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

      <Pressable style={styles.add}>
        <Text style={styles.addText}>AÑADIR FAMILIAR</Text>
      </Pressable>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },

  /* Header */
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

  backButtonPressed: {
    backgroundColor: "#eee",
  },

  titleContainer: {
    marginLeft: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F7463B",
  },

  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: "#F7463B",
    borderRadius: 2,
    marginVertical: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#999",
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: SPACING,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  addCard: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  emptyCard: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#bbb",
    borderStyle: "dashed",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardLabel: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },

  cardText: {
    fontWeight: "600",
  },

  add: {
    marginTop: 24,
    marginHorizontal: 16,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#4d8aed",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default Home;
