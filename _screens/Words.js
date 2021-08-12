import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const Words = ({ navigation, route }) => {
  const wordsPerPlayer = route.params.wordsPerPlayer;
  const players = route.params.players;
  const noOfTeams = route.params.noOfTeams;
  const teamNames = route.params.teamNames;
  const [words, setWords] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordCounter, setWordCounter] = useState(wordsPerPlayer);
  const [wordText, setWordText] = useState("");
  const [next, setNext] = useState(null); //To show button for next screen
  const [playersWithPartners, setPlayersWithPartners] = useState([]);

  const addWord = () => {
    if (wordIndex !== wordsPerPlayer - 1) {
      setWords([...words, wordText]);
      setWordCounter(wordCounter - 1);
      setWordIndex(wordIndex + 1);
      setWordText("");
    } else if (playerIndex !== players.length - 1) {
      setWords([...words, wordText]);
      setWordIndex(0);
      setPlayerIndex(playerIndex + 1);
      setWordCounter(wordsPerPlayer);
      setWordText("");
    } else {
      setWords([...words, wordText]);
      setNext(true);
      setWordText("");
    }
  };
  const onWordTextChange = (wordtext) => setWordText(wordtext);
  const wordInputStyle = () =>
    next
      ? {
          backgroundColor: "#616160",
          borderRadius: 10,
          margin: 10,
          height: 50,
          width: 200,
        }
      : {
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 10,
          height: 50,
          width: 200,
        };
  const addButtonStyle = () =>
    wordText
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
  const nextButtonStyle = () => {
    return {
      color: "#ffffff",
      margin: 5,
      height: 55,
      width: "30%",
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      margin: 30,
    };
  };
  const sortedPlayers = () => {
    //Sort array of players into array of teams array
    let playersPerTeam = 0;
    let playerCounter = 0;
    let teamSwap = [];
    let tempTeams = [];
    playersPerTeam = players.length / noOfTeams;
    console.log(playersPerTeam);
    for (let t = 0; t < noOfTeams; t++) {
      for (let p = 0; p < playersPerTeam; p++) {
        const plyr = players[playerCounter];
        teamSwap.push(plyr);
        playerCounter += 1;
      }
      tempTeams.push(teamSwap);
      teamSwap = [];
    }
    //setTeams(tempTeams);
    //Sort Players with partners
    let tempPlayersWithPartners = [];
    tempTeams.map((pteam, index) => {
      pteam.map((pplayer, pindex) => {
        if (!pteam[pindex + 1]) {
          tempPlayersWithPartners.push({
            name: pplayer.name,
            teamName: pplayer.teamName,
            partner: pteam[0].name,
          });
        } else {
          //Edit here
          tempPlayersWithPartners.push({
            name: pplayer.name,
            teamName: pplayer.teamName,
            partner: pteam[pindex + 1].name,
          });
        }
      });
    });
    return tempPlayersWithPartners;
  };

  const NextButton = () => {
    return next ? (
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", margin: 5 }}
        disabled={next ? false : true}
        onPress={() => {
          const sortedplayers = sortedPlayers();
          navigation.navigate("Round", {
            playersAndPartners: sortedplayers,
            words: words,
            teamNames: teamNames,
          });
        }}
      >
        <AntDesign name="play" size={70} color="black" />
      </TouchableOpacity>
    ) : (
      <View></View>
    );
  };
  return (
    <View style={styles.container}>
      {next ? (
        <Text style={styles.header}>Press Start</Text>
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
            {players[playerIndex].name}
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
            add {wordsPerPlayer}{" "}
            {wordsPerPlayer === 1 ? "word or phrase" : "words or phrases"}
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
            {wordCounter}{" "}
            {wordCounter === 1 ? "word or phrase" : "words or phrases"} left
          </Text>
        </View>
      )}
      <View style={styles.input}>
        {next ? (
          <View></View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              style={wordInputStyle()}
              onChangeText={onWordTextChange}
              value={wordText}
              placeholder="Type word or phrase..."
              textAlign="center"
              caretHidden={true}
              editable={next ? false : true}
            />
            <TouchableHighlight
              onPress={() => {
                addWord();
              }}
              style={addButtonStyle()}
              disabled={wordText ? false : true}
            >
              <Text style={{ color: "#ffffff" }}>Add</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <NextButton />
    </View>
  );
};
export default Words;

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
    marginTop: 30,
    fontFamily: "serif",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
});
