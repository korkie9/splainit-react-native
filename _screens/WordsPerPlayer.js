import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

const WordsPerPlayer = ({ navigation, route }) => {
  const [teams, setTeams] = useState(route.params.teams);
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const nextScreen = (number) => {
    navigation.navigate("Players", {
      teams: teams,
      playersPerTeam: route.params.playersPerTeam,
      wordsPerPlayer: number,
    });
  };
  const numberCard = (num) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          nextScreen(num);
        }}
      >
        <View style={styles.numCard}>
          <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 20 }}>
            {num}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Words Per Player</Text>
      <FlatList
        data={nums}
        renderItem={({ item }) => numberCard(item)}
        keyExtractor={(num) => num.toString()}
      />
    </View>
  );
};

export default WordsPerPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  numCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    height: 30,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'serif'
  },
});
