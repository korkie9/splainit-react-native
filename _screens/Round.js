import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
  FontAwesome5,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import countdown from "../assets/countdown.m4a";
import ratata from "../assets/ratata.m4a";
import ohnose from "../assets/ohnose.m4a";
import chicka from "../assets/chicka.m4a";

const Round = ({ navigation, route }) => {
  const [sound, setSound] = useState();
  const [splainerNumber, setSplainerNumber] = useState(0);
  const playersAndPartners = route.params.playersAndPartners;
  const words = route.params.words;
  const teamNames = route.params.teamNames;
  //States
  const [countDownCounter, setCountDownCounter] = useState(3);
  const [phase, setPhase] = useState("passPhase");
  const [score, setScore] = useState(0);
  const [currentWordNumber, setCurrentWordNumber] = useState(0);
  const [gameCountDownInterval, setGameCountDownInterval] = useState();
  const [gameCountDownTimeout, setGameCountDownTimeout] = useState();
  const [remainingWords, setRemainingWords] = useState(words);
  const [round, setRound] = useState(1);
  const [teamsAndScores, setTeamsAndScores] = useState([]);
  const [teamsAndRoundScore, setTeamsAndRoundScores] = useState([]);
  const [playersAndScores, setPlayersAndScores] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [jBsounds, setJBSounds] = useState([
    require("../assets/jbhah.m4a"),
    require("../assets/jbhitme.m4a"),
    require("../assets/jbho.m4a"),
    require("../assets/jblowho.m4a"),
    require("../assets/jbuh.m4a"),
    require("../assets/jbwow.m4a"),
    require("../assets/jbyew.m4a"),
    require("../assets/jbhey.m4a"),
  ]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(track) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(track);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  const startCountDownToGame = () => {
    playSound(countdown);
    setPhase("countDownPhase");
    let c = 3;
    const interval = setInterval(() => {
      c -= 1;
      setCountDownCounter(c);
      console.log(countDownCounter);
    }, 1000);
    setGameCountDownInterval(interval);
    setTimeout(() => {
      clearInterval(interval);
      setCountDownCounter(30);
      startGameCountDown(30);

      //setCountDownCounter(30);
      console.log("count down stoped, gamephase initiate");
    }, 3000);
  };
  const startGameCountDown = (x) => {
    setPhase("gamePhase");
    let c = x;
    const interval = setInterval(() => {
      c -= 1;
      setCountDownCounter(c);
      if (!remainingWords) {
        clearInterval(interval);
        setPhase("resultsPhase");
      }
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      playSound(ratata);
      setPhase("resultsPhase");
      console.log("Game count down stoped, results phase initiate");
    }, (x - 1) * 1000);
    setGameCountDownInterval(interval);
    setGameCountDownTimeout(timeout);
  };
  const stopGameCountDown = () => {
    clearInterval(gameCountDownInterval);
    clearTimeout(gameCountDownTimeout);
  };
  const pauseOrPlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return stopGameCountDown();
    }
    setIsPlaying(true);
    startGameCountDown(countDownCounter);
  };
  const addPoint = () => {
    playSound(jBsounds[generateRandomIntegerInRange(0, jBsounds.length - 1)]);
    setScore(score + 1);
    const newWords = [];
    remainingWords.map((word, index) => {
      if (index !== 0) {
        newWords.push(word);
      }
    });
    setRemainingWords(newWords);
    if (!remainingWords[1]) {
      console.log("remaining are words finished");
      console.log(score);
      setPhase("resultsPhase");
      clearInterval(gameCountDownInterval);
      clearTimeout(gameCountDownTimeout);
    }
  };
  const generateRandomIntegerInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const findWinners = (teamsAndPoints) => {
    let winningscore = 0;
    teamsAndPoints.map((tnp) => {
      if (tnp.score > winningscore) {
        winningscore = tnp.score;
      }
    });
    return teamsAndPoints.filter((tnp) => {
      tnp.score === winningScore;
    });
  };
  const endRound = () => {
    playSound(ohnose);
    clearInterval(gameCountDownInterval);
    clearTimeout(gameCountDownTimeout);
    setPhase("resultsPhase");
  };
  const startPassPhase = () => {
    //Set Scores Based on rounds
    //Set Players and scores ///////////
    let rOneScore = 0;
    let rTwoScore = 0;
    let tempPlayersWithScores = [];
    if (round === 1) {
      const playerWithScoreRound1 = {
        name: playersAndPartners[splainerNumber].name,
        teamName: playersAndPartners[splainerNumber].teamName,
        roundOneScore: score,
      };
      setPlayersAndScores([...playersAndScores, playerWithScoreRound1]);
      //Finish setting Players and scores ///////////
    } //
    if (round === 2) {
      rOneScore = 0;
      for (const player of playersAndScores) {
        if (player.name === playersAndPartners[splainerNumber].name) {
          if (player.roundOneScore) {
            rOneScore = rOneScore + player.roundOneScore;
          }
        }
      }
      const playerWithScoreRound2 = {
        name: playersAndPartners[splainerNumber].name,
        teamName: playersAndPartners[splainerNumber].teamName,
        roundOneScore: rOneScore,
        roundTwoScore: score,
      };

      for (const tplayer of playersAndScores) {
        if (tplayer.name !== playerWithScoreRound2.name) {
          tempPlayersWithScores.push(tplayer);
        }
      }
      tempPlayersWithScores.push(playerWithScoreRound2);
      setPlayersAndScores(tempPlayersWithScores);
      console.log("players and scores: ", tempPlayersWithScores);
    }
    if (round === 3) {
      for (const player of playersAndScores) {
        if (player.name === playersAndPartners[splainerNumber].name) {
          if (player.roundOneScore) rOneScore += player.roundOneScore;
          if (player.roundTwoScore) rTwoScore += player.roundTwoScore;
        }
      }
      const playerWithScoreRound3 = {
        name: playersAndPartners[splainerNumber].name,
        teamName: playersAndPartners[splainerNumber].teamName,
        roundOneScore: rOneScore,
        roundTwoScore: rTwoScore,
        roundThreeScore: score,
      };
      for (const player of playersAndScores) {
        if (player.name !== playerWithScoreRound3.name) {
          tempPlayersWithScores.push(player);
        }
      }
      tempPlayersWithScores.push(playerWithScoreRound3);
      setPlayersAndScores(tempPlayersWithScores);
      console.log("players and scores: ", tempPlayersWithScores);
    }
    //////Finish setting score ////////////////////

    ///Set teams and scores ///////
    let round1 = 0;
    let round2 = 0;
    let round3 = 0;
    let tempTeamsAndScores = [];
    for (const t of teamNames) {
      round1 = 0;
      round2 = 0;
      round3 = 0;
      for (const p of tempPlayersWithScores) {
        if (t === p.teamName) {
          if (p.roundOneScore) round1 += p.roundOneScore;
          if (p.roundTwoScore) round2 += p.roundTwoScore;
          if (p.roundThreeScore) round3 += p.roundThreeScore;
        }
      }
      const newTeamAndScore = {
        teamName: t,
        roundOneScore: round1,
        roundTwoScore: round2,
        roundThreeScore: round3,
      };
      tempTeamsAndScores.push(newTeamAndScore);
    }
    //finish setting teams and scores

    ///setting up rounds
    if (remainingWords.length === 0) {
      if (round === 3) {
        console.log("navigating to results");
        navigation.navigate("Results", {
          playersAndScores: tempPlayersWithScores,
          teamsAndScores: tempTeamsAndScores,
        });
      } else {
        setRound(round + 1);
        console.log("round:", round);
        setRemainingWords(words);
      }
    }

    if (!playersAndPartners[splainerNumber + 1]) {
      // if (round < 3) {
      //Figure out who won round
      console.log(playersAndScores);
      setSplainerNumber(0);
      setCountDownCounter(3);
      setPhase("passPhase");
      //startCountDownToGame();
      // } else {
      //   console.log("the game continues")
      //   setSplainerNumber(0)
      //   setCountDownCounter(3);
      //   startCountDownToGame();
      // }
    } else {
      setSplainerNumber(splainerNumber + 1);
      setCountDownCounter(3);
      setPhase("passPhase");
    }
    setScore(0);
    console.log(playersAndScores);
  };
  const action = () => {
    if (round === 1) return `'Splain`;
    if (round === 2) return "Enact";
    if (round === 3) return `Describe with one word `;
  };
  const Round = () => {
    if (round === 1)
      return (
        <MaterialCommunityIcons
          name="hand-pointing-up"
          size={60}
          color="black"
        />
      );
    if (round === 2)
      return (
        <MaterialCommunityIcons
          name="hand-peace-variant"
          size={60}
          color="black"
        />
      );
    if (round === 3)
      return (
        <MaterialCommunityIcons name="hand-okay" size={60} color="black" />
      );
  };
  if (phase === "passPhase")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 60,
              color: "#000000",
              fontFamily: "serif",
            }}
          >
            Round: <Round />
          </Text>
          <View style={{ margin: 20, flexDirection: "row" }}>
            <Octicons name="device-mobile" size={70} color="black" />
            <AntDesign name="swapright" size={70} color="black" />
            <MaterialCommunityIcons
              name="human-greeting"
              size={70}
              color="black"
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 80,
              color: "white",
              fontFamily: "serif",
            }}
          >
            {playersAndPartners[splainerNumber].partner}
          </Text>
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              startCountDownToGame();
            }}
          >
            <AntDesign name="play" size={80} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  if (phase === "countDownPhase")
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 45,
            color: "black",
            justifyContent: "center",
            textAlign: "center",
            margin: 15,
            fontFamily: "serif",
          }}
        >
          Round Starts in...
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 70,
            color: "white",
            fontFamily: "serif",
          }}
        >
          {countDownCounter}
        </Text>
      </View>
    );
  if (phase === "gamePhase")
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => {
            endRound();
          }}
        >
          <AntDesign name="closecircle" size={70} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text style={styles.headerText}>{countDownCounter}</Text>
          <TouchableWithoutFeedback
            style={{ margin: 20 }}
            onPress={() => {
              pauseOrPlay();
            }}
          >
            {isPlaying ? (
              <FontAwesome5 name="pause" size={40} color="black" />
            ) : (
              <FontAwesome5 name="play" size={40} color="black" />
            )}
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#000000",
            fontFamily: "serif",
            margin: 20,
          }}
        >
          <FontAwesome5 name="clipboard-check" size={40} color="black" />{" "}
          <Text style={{ color: "white" }}>{score}</Text>
        </Text>
        <Text style={styles.headerText}>
          {playersAndPartners[splainerNumber].partner}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#000000",
            fontFamily: "serif",
            margin: 20,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {action()}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "white",
            fontFamily: "serif",
          }}
        >
          {remainingWords[0]}
        </Text>
        <Text style={styles.headerText}>
          to {playersAndPartners[splainerNumber].name}
        </Text>
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => {
            addPoint();
          }}
        >
          <AntDesign name="checkcircle" size={70} color="black" />
        </TouchableOpacity>
      </View>
    );
  if (phase === "resultsPhase")
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 100,
            color: "white",
            fontFamily: "serif",
          }}
        >
          <FontAwesome5 name="clipboard-check" size={100} color="black" />{" "}
          {score}
        </Text>
        <TouchableOpacity
          style={{ margin: 50, marginTop: 50 }}
          onPress={() => {
            playSound(chicka);
            startPassPhase();
          }}
        >
          <AntDesign name="rightcircle" size={80} color="black" />
        </TouchableOpacity>
      </View>
    );
};

export default Round;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#ffffff",
    fontFamily: "serif",
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
  header: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#000000",
    fontFamily: "serif",
    margin: 10,
  },
  headerGameText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "grey",
    fontFamily: "serif",
    margin: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  startButton: {
    color: "#ffffff",
    margin: 5,
    height: 55,
    width: "30%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 30,
    width: 200,
  },
});
