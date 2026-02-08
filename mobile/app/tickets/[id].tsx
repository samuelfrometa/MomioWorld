import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

type Ticket = {
  id: number;
  movie_title: string;
  room: number;
  seat: number;
  image: any;
};

const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    movie_title: "Avatar",
    room: 3,
    seat: 12,
    image: require("../../assets/images/imagen_1.jpeg"),
  },
  {
    id: 2,
    movie_title: "Interstellar",
    room: 1,
    seat: 7,
    image: require("../../assets/images/imagen_2.jpeg"),
  },
  {
    id: 3,
    movie_title: "Inception",
    room: 5,
    seat: 20,
    image: require("../../assets/images/imagen_3.jpeg"),
  },
];

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [gridView, setGridView] = useState(false);

  const handleDelete = (id: number) => {
    Alert.alert("Eliminar ticket", "¿Seguro que quieres eliminarlo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () =>
          setTickets((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }: { item: Ticket }) => {
    if (gridView) {
      return (
        <Pressable
          style={styles.gridCard}
          onPress={() => router.push(`/tickets/${item.id}`)}
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.movie}>{item.movie_title}</Text>
        </Pressable>
      );
    }

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/tickets/${item.id}`)}
      >
        <Text style={styles.movie}>{item.movie_title}</Text>
        <Text style={styles.text}>Sala: {item.room}</Text>
        <Text style={styles.text}>Asiento: {item.seat}</Text>

        <Pressable
          style={styles.delete}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>Eliminar</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={gridView ? 2 : 1}
        key={gridView ? "grid" : "list"}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No hay tickets</Text>
          </View>
        }
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.barButton}
          onPress={() => setGridView((v) => !v)}
        >
          <Text style={styles.barText}>
            {gridView ? "📃 Lista" : "🟦 Cuadros"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.barButton, styles.add]}
          onPress={() => router.push("/tickets/new")}
        >
          <Text style={styles.addText}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  list: { padding: 16, paddingBottom: 90 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  gridCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 120,
  },

  movie: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    padding: 8,
  },

  text: { fontSize: 14, color: "#333" },

  delete: {
    marginTop: 10,
    backgroundColor: "#c0392b",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  deleteText: { color: "#fff", fontWeight: "600" },

  /* Bottom bar */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
  },

  barButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#000",
  },

  barText: {
    color: "#fff",
    fontWeight: "600",
  },

  add: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 28,
  },
});
