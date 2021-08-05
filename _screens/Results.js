import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const Results = ({ navigation, route }) => {
  const teamsAndScores = route.params.teamsAndScores
  //const [teamsAndScores, setTeamsAndScores] = useState([]);
  const playersAndScores = route.params.playersAndScores;
  
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(playersAndScores)}</Text>
      <Text>{JSON.stringify(teamsAndScores)}</Text>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
});
