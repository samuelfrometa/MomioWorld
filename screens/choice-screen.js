import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChoiceScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>

        <View style={styles.vaquita} />

        <Text style={styles.text}>
            HOLA JANA
        </Text>

        <View style={styles.sites}>
            <Pressable
            style={styles.home}
            onPress={() =>
                navigation.navigate("Main", { screen: "Home" })
            }
            />  

            <Pressable
            style={styles.stable}
            onPress={() =>
                navigation.navigate("Main", { screen: "Stable" })
            }
            />

            <Pressable
            style={styles.venice}
            onPress={() =>
                navigation.navigate("Main", { screen: "Venice" })
            }
            />
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  vaquita: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E06E36",
  },

  text : {
    marginLeft: 100,
    marginTop: 240,
    alignItems: "center",
    width: 200,
  },

  sites: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingBottom: 80,
  },

  home: {
    top: -100,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1BE01E",
  },

  stable: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E0741B",
  },

  venice: {
    top: -100,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#9C1BE0",
  },
});

export default ChoiceScreen;
