import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
//import Round from "../_components/rounds/Round";

const GamePlay = ({ navigation, route }) => {
  const words = route.params.words;
  // const players = route.params.players;
  // const noOfTeams = route.params.noOfTeams;
  const playersAndPartners = route.params.playersAndPartners
  ////States for Starting
  //const [isPassingPhone, setIsPassingPhone] = useState(true);
  const [countDownCounter, setCountDownCounter] = useState(3);
  const [teams, setTeams] = useState([]);
  //const [playersWithPartners, setPlayersWithPartners] = useState([]);
  const [splainerNumber, setSplainerNumber] = useState(0);
  const [playersAndScores, setPlayersAndScores] = useState([]);
  const [remainingWords, setRemainingWords] = useState(words); ///Words that are left to explain during round

  const [phase, setPhase] = useState("passPhase");
  const [score, setScore] = useState(0);
///screen
  ///Round States
  const [round, setRound] = useState(1);

  const startCountDown = () => {
    let c = 3
    setPhase('countDownPhase')
    setCountDownCounter(3);
    const interval = setInterval(() => {
      if (c === -1) {
        setCountDownCounter(3);
        startRound();
        clearInterval(interval);
        console.log("stopped count Down");
      }
      setCountDownCounter(c);
      console.log(c);
      c -= 1;
    }, 1000);
  };
  const startRound = () => {
    let c = 30
    setPhase('resultsPhase')
    setCountDownCounter(30);
    const interval = setInterval(() => {
      if (c === -1) {
        setCountDownCounter(30);
        finishRound();
        clearInterval(interval);
        console.log("stopped count round");
      }
      setCountDownCounter(c);
      console.log(c);
      c -= 1;
    }, 1000);
  };
  const addPoint = () => {
    const rWords = remainingWords.filter((word) => !word);
    if (!rWords) {
      // clearInterval(interval);
      setPhase("resultsPhase");
    }
    setRemainingWords(rWords);
    setScore(score + 1);
  };
  // const test = () => {
  //   console.log(noOfTeams);
  //   console.log(JSON.stringify(teams));
  // };
  const finishRound = () => {
    const splainer = playersAndPartners[splainerNumber];
    if (round === 1) { //set the new score
      console.log(splainer)
      // setPlayersAndScores([
      //   ...playersAndScores,
      //   {
      //     name: splainer.name,
      //     teamName: splainer.teamName,
      //     score: score,
      //   },
      // ]);
    } else {
      const newPlayersAndScores = playersAndScores.map((player) =>
        player.name === splainer.name  //Map array and if name is === to current players name, set score
          ? { name: player.name, teamName: player.teamName, score: score }
          : player
      );
      setPlayersAndScores(newPlayersAndScores);
    }
    if (playersAndPartners[splainerNumber + 1]) {

      //TODO: Add scores with players
      setSplainerNumber(splainerNumber + 1);
      setSplainerNumber(0);
      setRemainingWords(words);
      setPhase("passPhase");
    } else if (round < 3) {
      //setPlayersWithPartners(0)
      setSplainerNumber(0);
      setRound(round + 1);
      setRemainingWords(words);
      setPhase("passPhase");
      //TODO: Add scores to players and scores
    } else {
      navigation.navigate("Results", {
        playersAndScores: playersAndScores,
      });
    }
  };
  // const startCountDownAndRoundPhase = () => {
  //   setPhase("countDownPhase");
  //   startCountDown(3, setPhase("roundPhase"));
  // };
  const generateRandomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  if (phase === "passPhase")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Pass the phone to</Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 50,
              color: "#000000",
              fontFamily: "serif",
            }}
          >
            {playersAndPartners[splainerNumber].partner}
          </Text>
          <TouchableHighlight
            onPress={startCountDown()}
            style={{ width: 200, backgroundColor: "#000000" }}
          >
            <Text style={{ color: "#ffffff" }}>Start</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  if (phase === "countDownPhase")
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Round Starts in...</Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 50,
            color: "#000000",
            fontFamily: "serif",
          }}
        >
          {countDownCounter}
        </Text>
      </View>
    );
  if (phase === "roundPhase")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {playersAndPartners[splainerNumber].partner}
          </Text>
          <Text style={styles.headerText}>
            'splain{" "}
            {
              remainingWords[
                generateRandomIntegerInRange(0, remainingWords.length - 1)
              ]
            }
          </Text>
          <Text style={styles.headerText}>
            to {playersAndPartners[splainerNumber].name}
          </Text>
          <TouchableHighlight onPress={addPoint()}>
            <AntDesign name="checkcircle" size={24} color="black" />
            <Text style={{ color: "#ffffff" }}>Got It!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  if (phase === "resultsPhase")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Score: </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 50,
              color: "#000000",
              fontFamily: "serif",
            }}
          >
            {score}
          </Text>
          <TouchableHighlight
            onPress={finishRound()}
            style={{ width: 200, backgroundColor: "#000000" }}
          >
            <Text style={{ color: "#ffffff" }}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
};

export default GamePlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000000",
    fontFamily: "serif",
  },
});
