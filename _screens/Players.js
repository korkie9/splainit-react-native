import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

const Players = ({ route }) => {
    const [teams, setTeams] = useState(route.params.teams);
    const [noOfPlayers, setNoOfPlayers] = useState(route.params.playersPerTeam);
  return (
    <View style={styles.container}>
        <Text>{teams[1]}</Text>
        <Text>{noOfPlayers}</Text>
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
  }
});