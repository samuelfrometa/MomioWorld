import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

type Ticket = {
  id: number;
  movie_title: string;
  room: number;
  seat: number;
  date: string;
  month: string;
  location: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
};

const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    movie_title: "Avatar",
    room: 3,
    seat: 12,
    date: "14",
    month: "FEB",
    location: "ODEON LUXE",
    genre: "Sci-Fi · Adventure",
    rating: 5,
    isFavorite: true,
  },
  {
    id: 2,
    movie_title: "Interstellar",
    room: 1,
    seat: 7,
    date: "01",
    month: "MAR",
    location: "IMAX WATERLOO",
    genre: "Sci-Fi · Drama",
    rating: 5,
    isFavorite: false,
  },
  {
    id: 3,
    movie_title: "Inception",
    room: 5,
    seat: 20,
    date: "12",
    month: "AUG",
    location: "LOCAL DRIVE-IN",
    genre: "Action · Thriller",
    rating: 4,
    isFavorite: true,
  },
];

const FILTERS = ["All", "Date", "Rating", "Genre"];

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleDelete = (id: number) => {
    Alert.alert(
      "Eliminar ticket",
      "¿Seguro que quieres eliminar este ticket?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setTickets((prev) => prev.filter((t) => t.id !== id));
          },
        },
      ]
    );
  };

  const toggleFavorite = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t))
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Text key={i} style={styles.star}>
            {i < rating ? "★" : "☆"}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>COLLECTION</Text>
          <Text style={styles.title}>Ticket Box</Text>
        </View>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/tickets/new")}
        >
          <Text style={styles.addIcon}>+</Text>
        </Pressable>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Tickets List */}
      <FlatList
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No hay tickets</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.ticketCard}
            onPress={() => router.push(`/tickets/${item.id}`)}
            onLongPress={() => handleDelete(item.id)}
          >
            {/* Date Section */}
            <View style={styles.dateSection}>
              <Text style={styles.dateNumber}>{item.date}</Text>
              <Text style={styles.dateMonth}>{item.month}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            {/* Movie Info Section */}
            <View style={styles.movieSection}>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.movie_title}</Text>
                <View style={styles.ratingRow}>
                  {renderStars(item.rating)}
                  <Text style={styles.genre}>{item.genre}</Text>
                </View>
              </View>

              {/* Favorite Button */}
              <Pressable
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Text style={styles.favoriteIcon}>
                  {item.isFavorite ? "❤️" : "🤍"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a0a0f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  subtitle: {
    color: "#e63946",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "300",
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#2d1b21",
  },
  filterButtonActive: {
    backgroundColor: "#e63946",
  },
  filterText: {
    color: "#999",
    fontSize: 15,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
  ticketCard: {
    flexDirection: "row",
    marginBottom: 20,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#2d1b21",
  },
  dateSection: {
    width: 100,
    backgroundColor: "#3d2b31",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  dateNumber: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "800",
  },
  dateMonth: {
    color: "#e63946",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  location: {
    color: "#666",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 40,
    transform: [{ rotate: "-90deg" }],
    width: 100,
    textAlign: "center",
  },
  movieSection: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  movieInfo: {
    gap: 8,
    marginTop: "auto",
  },
  movieTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stars: {
    flexDirection: "row",
  },
  star: {
    color: "#ffd700",
    fontSize: 16,
  },
  genre: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: "500",
  },
  favoriteButton: {
    alignSelf: "flex-end",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 20,
  },
});