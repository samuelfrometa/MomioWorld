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

export default function NewTicket() {
  const [movieTitle, setMovieTitle] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [room, setRoom] = useState("");
  const [seat, setSeat] = useState("");

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!movieTitle || !cinemaName || !date) {
      Alert.alert("Error", "Rellena los campos obligatorios");
      return;
    }

    try {
      setLoading(true);

      await createTicket({
        movie_title: movieTitle,
        cinema_name: cinemaName,
        room: room ? Number(room) : null,
        seat: seat || null,
        date: date.toISOString(), // siempre válida
      });

      router.back();
    } catch (error) {
      console.error(error);
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

      {/* Selector de fecha */}
      <Pressable
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: date ? "#000" : "#999" }}>
          {date ? date.toLocaleDateString() : "Seleccionar fecha *"}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Sala"
        keyboardType="numeric"
        value={room}
        onChangeText={setRoom}
      />

      <TextInput
        style={styles.input}
        placeholder="Asiento"
        value={seat}
        onChangeText={setSeat}
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Guardando..." : "Guardar Ticket"}
        </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
