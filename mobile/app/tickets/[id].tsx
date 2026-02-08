import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getTicket } from "../../src/features/tickets/tickets.api";

type Ticket = {
  movie_title: string;
  cinema_name: string;
  room: number | null;
  seat: number | null;
  date: string;
  rate: number | null;
  favorite: boolean;
};

export default function TicketDetail() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    const res = await getTicket(id);
    setTicket(res.data);
  };

  if (!ticket) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticket.movie_title}</Text>
      <Text style={styles.text}>Cine: {ticket.cinema_name}</Text>
      <Text style={styles.text}>Sala: {ticket.room ?? "-"}</Text>
      <Text style={styles.text}>Asiento: {ticket.seat ?? "-"}</Text>
      <Text style={styles.text}>
        Fecha: {new Date(ticket.date).toLocaleDateString()}
      </Text>
      <Text style={styles.text}>
        Valoración: {ticket.rate ?? "Sin valorar"}
      </Text>
      <Text style={styles.text}>
        Favorito: {ticket.favorite ? "Sí ❤️" : "No"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f4ff",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#1e3a5f",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1e3a5f",
  },
});
