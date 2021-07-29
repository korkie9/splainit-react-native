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

const Home = ({ navigation }) => {
  const newGame = () => {
    navigation.push("NewGame");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={newGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const ps = [
            { name: "P1", teamName: "T1" },
            { name: "P2", teamName: "T1" },
            { name: "P3", teamName: "T1" },
            { name: "P4", teamName: "T2" },
            { name: "P5", teamName: "T2" },
            { name: "P6", teamName: "T2" },
            { name: "P7", teamName: "T3" },
            { name: "P8", teamName: "T3" },
            { name: "P9", teamName: "T3" },
          ]
          const ws = ['w1', 'w1', 'w3', 'w4']
          navigation.navigate('Words', {wordsPerPlayer: 2, players: ps, noOfTeams: 3})
        }}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

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
});
