import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  getTickets,
  deleteTicket,
} from "../../src/features/tickets/tickets.api";

type Ticket = {
  id: number;
  movie_title: string;
  room: number;
  seat: number;
};

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadTickets();
    }, [])
  );


  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudieron cargar los tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Eliminar ticket",
      "¿Seguro que quieres eliminar este ticket?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTicket(id);
              setTickets((prev) => prev.filter((t) => t.id !== id));
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "No se pudo eliminar el ticket");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No hay tickets</Text>
          </View>
        }
        renderItem={({ item }) => (
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
        )}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/tickets/new")}
      >
        <Text style={styles.addText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  movie: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  delete: {
    marginTop: 10,
    backgroundColor: "#c0392b",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#000",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  addText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 28,
  },
});
