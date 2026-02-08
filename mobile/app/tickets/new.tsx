import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createTicket } from "../../src/features/tickets/tickets.api";
import { Ionicons } from "@expo/vector-icons";

export default function NewTicket() {
  const [movieTitle, setMovieTitle] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [room, setRoom] = useState("");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const [rate, setRate] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!movieTitle || !cinemaName || !room || !seat) {
      Alert.alert("Error", "Rellena los campos obligatorios");
      return;
    }

    try {
      setLoading(true);

      await createTicket({
        movie_title: movieTitle,
        cinema_name: cinemaName,
        room: Number(room),
        seat: Number(seat),
        date: date?.toISOString(),
        rate,
        favorite,
      });

      router.back();
    } catch (e) {
      Alert.alert("Error", "No se pudo crear el ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Ticket</Text>

      <TextInput
        style={styles.input}
        placeholder="Película *"
        value={movieTitle}
        onChangeText={setMovieTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Cine *"
        value={cinemaName}
        onChangeText={setCinemaName}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Sala *"
          keyboardType="numeric"
          value={room}
          onChangeText={setRoom}
        />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Asiento *"
          keyboardType="numeric"
          value={seat}
          onChangeText={setSeat}
        />
      </View>

      {/* Fecha */}
      <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
        <Text style={{ color: date ? "#000" : "#999" }}>
          {date ? date.toLocaleDateString() : "Seleccionar fecha"}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          onChange={(_, d) => {
            setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}

      {/* Rating */}
      <Text style={styles.label}>Valoración</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => setRate(n)}>
            <Ionicons
              name={n <= rate ? "star" : "star-outline"}
              size={28}
              color="#f5c518"
            />
          </Pressable>
        ))}
      </View>

      {/* Favorito */}
      <Pressable
        style={styles.favorite}
        onPress={() => setFavorite((v) => !v)}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={26}
          color={favorite ? "#e11d48" : "#666"}
        />
        <Text style={styles.favoriteText}>Marcar como favorito</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Guardando..." : "Crear Ticket"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8fd3ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  label: {
    color: "#aaa",
    marginBottom: 6,
    marginTop: 10,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 6,
  },
  favorite: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 30,
  },
  favoriteText: {
    color: "#ccc",
  },
  button: {
    backgroundColor: "#e11d48",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
