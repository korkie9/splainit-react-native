import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Players = ({ route }) => {
  const teamNames = route.params.teams;
  const playersPerTeam = route.params.playersPerTeam;
  const wordsPerPlayer = route.params.wordsPerPlayer;

  const [teamIndex, setTeamIndex] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]); //Final list of players to be passed to next component { name, teamName}
  const [playerText, setPlayerText] = useState(""); //For input of player's name
  const [next, setNext] = useState(null); //To show button for next screen

  const onPlayerTextChange = (player) => {
    setPlayerText(player);
  };

  const playerCard = (p) => {
    return (
      <View style={styles.itemCard}>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "center",
            marginRight: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2
          }}
        >
          <Text style={{ padding: 10 }}>{p.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: "#ffdede",
            flex: 1,
            marginLeft: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 2,
            borderTopLeftRadius: 2,
          }}
        >
          <Text style={{ padding: 10 }}>{p.teamName}</Text>
        </View>
      </View>
    );
  };

  const nextScreen = () => {
    if (teams.length < 2) return Alert.alert("Please add at least 2 teams");
    navigation.navigate("PlayersPerTeam", { teams: teams });
  };
  const nextButtonStyle = () => 
    next ? 
    {
      color: "#ffffff",
      margin: 5,
      height: 55,
      width: "30%",
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      margin: 30,
    } : {
      color: "#ffffff",
      margin: 5,
      height: 55,
      width: "30%",
      backgroundColor: "#616160",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      margin: 30,
    }
  
  const NextButton = () => {
    return (
      <TouchableHighlight
        style={nextButtonStyle()}
        disabled={next ? false : true}
        onPress={() => console.log(JSON.stringify(players))} ////////////////////////////Testing
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableHighlight>
    );
  };
  const addName = () => {
    if (playerIndex !== playersPerTeam - 1) {
      setPlayers([
        ...players,
        { name: playerText, teamName: teamNames[teamIndex] },
      ]);
      setPlayerIndex(playerIndex + 1);
      setPlayerText('')
    } else if (teamIndex !== teamNames.length - 1) {
      setPlayers([
        ...players,
        { name: playerText, teamName: teamNames[teamIndex] },
      ]);
      setPlayerIndex(0);
      setTeamIndex(teamIndex + 1);
      setPlayerText('')
    } else {
      setPlayers([
        ...players,
        { name: playerText, teamName: teamNames[teamIndex] },
      ]);
      setNext(true);
      setPlayerText('')
    }
  };
  const addButtonStyle = () =>
    playerText
      ? {
          backgroundColor: "#000000",
          height: 50,
          width: 70,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }
      : {
          backgroundColor: "#616160",
          height: 50,
          width: 70,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        };
  return (

    <View style={styles.container}>
      <Text style={styles.header}>
        {teamNames[teamIndex]} Add your players
      </Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          onChangeText={onPlayerTextChange}
          value={playerText}
          placeholder="Player Name"
          textAlign="center"
          caretHidden={true}
          editable={next ? false : true}
        />
        <TouchableHighlight
          onPress={() => {
            addName();
          }}
          style={addButtonStyle()}
          disabled={playerText ? false : true}
        >
          <Text style={{ color: "#ffffff" }}>Add</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        data={players}
        renderItem={({ item }) => playerCard(item)}
        keyExtractor={(player) => `${playerIndex.toString()}${teamIndex.toString()}`}
      />
      <NextButton />
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
  },
  inputText: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: "50%",
  },
  itemCard: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 300,
    height: 50,
    margin: 10,
    borderRadius: 7,
  },
  itemCardText: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
