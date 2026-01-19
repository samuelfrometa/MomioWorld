import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const Maps = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setRegion({
          latitude: 40.4168,
          longitude: -3.7038,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const addMarker = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled) return;

    setMarkers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        latitude,
        longitude,
        image: result.assets[0].uri,
      },
    ]);
  };

  if (!region) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onLongPress={addMarker}
        mapType="standard"
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            onPress={() => setSelectedMarker(m)}
          />
        ))}
      </MapView>

      <Modal visible={!!selectedMarker} transparent animationType="fade">
        <Pressable style={styles.modal} onPress={() => setSelectedMarker(null)}>
          {selectedMarker && (
            <Image source={{ uri: selectedMarker.image }} style={styles.image} />
          )}
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});

export default Maps;
