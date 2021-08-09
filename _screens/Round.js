import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const Round = ({ navigation, route }) => {
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

  useEffect(() => {
    return(() => {
        clearInterval(gameCountDownInterval)
        clearTimeout(gameCountDownTimeout)
    })
},[])

  const startCountDownToGame = () => {
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
      setCountDownCounter();
      startGameCountDown();

      setCountDownCounter(30);
      console.log("count down stoped, gamephase initiate");
    }, 3000);
  };
  const startGameCountDown = () => {
    setPhase("gamePhase");
    let c = 30;
    const interval = setInterval(() => {
      c -= 1;
      setCountDownCounter(c);
      if (!remainingWords) {
        clearInterval(interval);
        setPhase("resultsPhase");
      }
      // console.log(countDownCounter);
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPhase("resultsPhase");
      console.log("Game count down stoped, results phase initiate");
    }, 29000);
    setGameCountDownInterval(interval);
    setGameCountDownTimeout(timeout);
  };
  const addPoint = () => {
    //setCurrentWordNumber(generateRandomIntegerInRange(0, remainingWords.length - 1))
    setScore(score + 1);
    const newWords = [];
    remainingWords.map((word, index) => {
      if (index !== 0) {
        newWords.push(word);
      }
    });
    // console.log(newWords);
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
      startCountDownToGame();
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

  if (phase === "passPhase")
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Round: {round}</Text>
          <Text style={styles.headerText}>Pass the phone to</Text>
          <Text style={styles.headerText}>
            {playersAndPartners[splainerNumber].partner}
          </Text>
          <TouchableHighlight
            style={styles.startButton}
            onPress={() => {
              startCountDownToGame();
            }}
          >
            <Text style={styles.nextButtonText}>Start</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  if (phase === "countDownPhase")
    return (
      <View style={styles.container}>
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
  if (phase === "gamePhase")
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => {
            endRound();
          }}
        >
          <AntDesign name="closecircle" size={60} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{countDownCounter}</Text>
        <Text style={styles.headerText}>Current Score: {score}</Text>
        <Text style={styles.headerGameText}>
          {playersAndPartners[splainerNumber].partner}
        </Text>
        <Text style={styles.headerGameText}>'splain</Text>
        <Text style={styles.headerText}>{remainingWords[0]}</Text>
        <Text style={styles.headerGameText}>
          to {playersAndPartners[splainerNumber].name}
        </Text>
        <TouchableOpacity
          style={{ margin: 20 }}
          onPress={() => {
            addPoint();
          }}
        >
          <AntDesign name="checkcircle" size={60} color="black" />
        </TouchableOpacity>
      </View>
    );
  if (phase === "resultsPhase")
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Final Score: {score}</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            startPassPhase();
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
    fontSize: 30,
    color: "#000000",
    fontFamily: "serif",
  },
  headerGameText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "grey",
    fontFamily: "serif",
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
