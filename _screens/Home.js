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
          navigation.push("DaRules");
        }}
      >
        <Text style={styles.buttonText}>Da Rules</Text>
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
          ];
          const tns = ["T1", "T2", "T3"];
          const ws = ["w1", "w1", "w3", "w4"];
          navigation.navigate("Words", {
            wordsPerPlayer: 2,
            players: ps,
            noOfTeams: 3,
            teamNames: tns,
          });
        }}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      {/* To results button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const pns = [
            {
              name: "P1",
              roundOneScore: 1,
              roundTwoScore: 3,
              roundThreeScore: 0,
            },
            {
              name: "P2",
              roundOneScore: 1,
              roundTwoScore: 3,
              roundThreeScore: 0,
            },
            {
              name: "P3",
              roundOneScore: 1,
              roundTwoScore: 3,
              roundThreeScore: 0,
            },
            {
              name: "P4",
              roundOneScore: 1,
              roundTwoScore: 3,
              roundThreeScore: 0,
            },
          ];
          const tns = [
            {
              teamName: "T1",
              roundOneScore: 9,
              roundTwoScore: 0,
              roundThreeScore: 5,
            },
            {
              teamName: "T2",
              roundOneScore: 1,
              roundTwoScore: 4,
              roundThreeScore: 2,
            },
            {
              teamName: "T3",
              roundOneScore: 6,
              roundTwoScore: 0,
              roundThreeScore: 1,
            },
          ];
          navigation.navigate("Results", {
            playersAndScores: pns,
            teamsAndScores: tns,
          });
        }}
      >
        <Text style={styles.buttonText}>Results</Text>
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
