import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import click from "../assets/click.m4a"
import { Audio } from 'expo-av';


const Players = ({ navigation, route }) => {
  const teamNames = route.params.teams;
  const playersPerTeam = route.params.playersPerTeam;
  const wordsPerPlayer = route.params.wordsPerPlayer;

  const [teamIndex, setTeamIndex] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]); //Final list of players to be passed to next component { name, teamName}
  const [playerText, setPlayerText] = useState(""); //For input of player's name
  const [next, setNext] = useState(null); //To show button for next screen
  const [sound, setSound] = useState();
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const onPlayerTextChange = (player) => {
    setPlayerText(player);
  };
  const playSound = async (track) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(track);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
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
            borderBottomRightRadius: 2,
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

  const NextButton = () => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        disabled={next ? false : true}
        onPress={() => {
          playSound(click)
          navigation.navigate("Words", {
            players: players,
            wordsPerPlayer: wordsPerPlayer,
            noOfTeams: teamNames.length,
            teamNames: teamNames,
          });
        }}
      >
        <FontAwesome name="chevron-circle-right" size={70} color="black" />
      </TouchableOpacity>
    );
  };
  const addName = () => {
    if(!playerText.trim()) return Alert.alert("Please add a name")
    let nameAlreadyExists = null;
    players.map((p) => {
      if (p.name === playerText.trim()) nameAlreadyExists = true;
    });
    if (!nameAlreadyExists && playerIndex !== playersPerTeam - 1) {
      playSound(click)
      setPlayers([
        ...players,
        { name: playerText.trim(), teamName: teamNames[teamIndex] },
      ]);
      setPlayerIndex(playerIndex + 1);
      setPlayerText("");
    } else if (!nameAlreadyExists && teamIndex !== teamNames.length - 1) {
      playSound(click)
      setPlayers([
        ...players,
        { name: playerText.trim(), teamName: teamNames[teamIndex] },
      ]);
      setPlayerIndex(0);
      setTeamIndex(teamIndex + 1);
      setPlayerText("");
    } else if (!nameAlreadyExists) {
      playSound(click)
      setPlayers([
        ...players,
        { name: playerText.trim(), teamName: teamNames[teamIndex] },
      ]);
      setNext(true);
      setPlayerText("");
    } else {
      Alert.alert("Please add a unique name");
    }
  };
  const playerInputStyle = () => {
    return {
      backgroundColor: "#ffffff",
      borderRadius: 10,
      margin: 10,
      height: 50,
      width: "50%",
    };
  };

  return (
    <View style={styles.container}>
      {next ? (
        <Text style={styles.header}>Your Players...</Text>
      ) : (
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              margin: 20,
              marginTop: 30,
              fontFamily: "serif",
              textAlign: "center",
            }}
          >
            {teamNames[teamIndex]}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              margin: 20,
              marginTop: 0,
              fontFamily: "serif",
              textAlign: "center",
            }}
          >
            Add your players
          </Text>
        </View>
      )}
      {!next ? (
        <View style={styles.input}>
          <TextInput
            style={playerInputStyle()}
            onChangeText={onPlayerTextChange}
            value={playerText}
            placeholder="Type Player's Name..."
            textAlign="center"
            caretHidden={true}
            editable={next ? false : true}
          />
          <TouchableOpacity
            onPress={() => {
              addName();
            }}
            disabled={playerText ? false : true}
          >
            {playerText ? (
              <AntDesign name="checkcircle" size={40} color="black" />
            ) : (
              <AntDesign name="checkcircle" size={40} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
      <FlatList
        data={players}
        renderItem={({ item }) => playerCard(item)}
        keyExtractor={(player) => player.name.toString()}
      />
      {next && <NextButton />}
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
    margin: 20,
    marginTop: 80,
    fontFamily: "serif",
    textAlign: "center",
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
