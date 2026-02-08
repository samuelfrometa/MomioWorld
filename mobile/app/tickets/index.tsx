import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import {
  getTickets,
  deleteTicket,
} from "../../src/features/tickets/tickets.api";

type Ticket = {
  id: number;
  movie_title: string;
  cinema_name: string;
  date: string;
  rate: number | null;
  favorite: boolean;
};

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      const newTickets = res?.data ?? [];
      setTickets(newTickets);

      // Hacer scroll al final después de que la lista se actualiza
      setTimeout(() => {
        if (flatListRef.current && newTickets.length > 0) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    } catch {
      Alert.alert("Error", "No se pudieron cargar los tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTickets();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert("Eliminar ticket", "¿Seguro que quieres eliminarlo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deleteTicket(id);
          setTickets((prev) => prev.filter((t) => t.id !== id));
        },
      },
    ]);
  };

  const renderStars = (rate: number | null) => (
    <View style={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Text key={i} style={styles.star}>
          {i < (rate ?? 0) ? "★" : "☆"}
        </Text>
      ))}
    </View>
  );

  if (loading && tickets.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tickets ?? []}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No hay tickets</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/tickets/${item.id}`)}
            onLongPress={() => handleDelete(item.id)}
          >
            <LinearGradient
              colors={["#e6f4ff", "#8fd3ff", "#4bb3ff"]}
              style={styles.card}
            >
              <Text style={styles.title}>{item.movie_title}</Text>
              <Text style={styles.subtitle}>{item.cinema_name}</Text>
              {renderStars(item.rate)}
              <Text style={styles.heart}>{item.favorite ? "❤️" : "🤍"}</Text>
            </LinearGradient>
          </Pressable>
        )}
        refreshing={loading}
        onRefresh={loadTickets}
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
  container: { flex: 1, backgroundColor: "#e6f4ff" },
  list: { padding: 16, paddingBottom: 100 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e3a5f",
  },

  subtitle: {
    fontSize: 14,
    color: "#1e3a5f",
    marginBottom: 8,
  },

  stars: { flexDirection: "row" },
  star: { color: "#ffd700", fontSize: 16 },

  heart: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 18,
  },

  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4bb3ff",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 32,
  },
});
