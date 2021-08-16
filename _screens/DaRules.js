import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const DaRules = ({ navigation }) => {
  const newGame = () => {
    navigation.push("NewGame");
  };
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Game Rules</Text>
        <Text style={styles.subHeader}>Game Rules</Text>
        <Text style={styles.header}>Game Play</Text>
        <Text style={styles.subHeader}>Step 1</Text>
        <Text style={styles.paragraph}>Sort Players into equal teams</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {navigation.navigate("Home")}}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DaRules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#ffffff",
    margin: 5,
    height: "10%",
    width: "90%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    marginTop: 40,
    fontFamily: "serif",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginTop: 25,
    fontFamily: "serif",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 15,
    margin: 20,
    fontFamily: "serif",
    textAlign: "center",
  },
});
