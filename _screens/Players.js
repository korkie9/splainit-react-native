import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";

const Players = ({ route }) => {
  const teamNames = route.params.teams;
  const playersPerTeam = route.params.playersPerTeam;
  const wordsPerPlayer = route.params.wordsPerPlayer;

  const [teamIndex, setTeamIndex] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]); //Final list of players to be passed to next component { name, teamName}
  const [playerText, setPlayerText] = useState(""); //For input of player's name
  const [next, setNext] = useState('null'); //To show button for next screen

  const onPlayerTextChange = (player) => {
    setPlayerText(player);
  };
  const addName = (tName) => {
    if (playerIndex !== playersPerTeam-1) {
      setPlayers([...players, { name: playerText, teamName: tName }]);
      setPlayerIndex(playerIndex + 1);
    } else if (teamIndex !== teamNames.length -1) {
      setPlayers([...players, { name: playerText, teamName: tName }]);
      setPlayerIndex(0);
      setTeamIndex(teamIndex + 1);
    } else {
      setPlayers([...players, { name: playerText, teamName: tName }]);
      setNext('true');
    }

  };
  return (
    <View style={styles.container}>
      <Text>{teamNames[teamIndex]} Add your players</Text>
      <Text>{JSON.stringify(players)}</Text>
      <Text>{next}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={onPlayerTextChange}
        value={playerText}
        placeholder="Players Name"
        textAlign="center"
        caretHidden={true}
      />
      <TouchableHighlight
        style={styles.nextButton}
        onPress={() => addName(teamNames[teamIndex])}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    color: "#ffffff",
    margin: 5,
    height: 55,
    width: "30%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 30,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
});
