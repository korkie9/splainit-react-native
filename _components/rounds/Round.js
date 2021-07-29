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
  TouchableHighlight
} from "react-native";

const Round = (props) => {
  const receivedWords = props.remainingWords;
  const [score, setScore] = useState(0);
  const [countDownCounter, setCountDownCounter] = useState(3);
 // const [isCountingDown, setIsCountingDown] = useState(true);
  const [remainingWords, setRemainingWords] = useState(receivedWords); //Deal with this
  const [countDownIntervalID, setCountDownIntervalID ] = useState()
  //const [currentWordNumber, setCurrentWordNumber] = useState(0);
  const [screen, setScreen] = useState("countDown"); //3 screens (countDown, game, next)
  const splainer = props.splainer;
  const round = props.round
  useEffect(() => {
    return () => startCountDown();
  }, []);

  const startCountDown = () => {
    let c = 3;
    setCountDownCounter(3);
    //setIsCountingDown(true);
    const interval = setInterval(() => {
      if (c === -1) {
        setCountDownCounter(3);
        clearInterval(interval);
        setScreen('game'); //change screen
        startTimer();
        console.log("stopped");
      }
      setCountDownCounter(c);
      console.log(c);

      c -= 1;
    }, 1000);
  };
  const startTimer = () => {
    let time = 30;
    setCountDownCounter(30);
    //setIsCountingDown(true);
    const interval = setInterval(() => {
      if (time === -1) {
        setCountDownCounter(3);
        clearInterval(interval);
        props.onRoundFinished(splainer, score);
        console.log("stopped");
      }
      setCountDownCounter(c);
      console.log(c);
      time -= 1;
    }, 1000);
  };
  const addPoint = () => {
    const rWords = remainingWords.filter(word => !word)
    if(!rWords) {
     // clearInterval(interval);
      setScreen('results')
    }
    setRemainingWords(rWords)
    setScore(score + 1)
  }
  const handleRoundFinished = () => {
    props.onRoundFinished(splainer, score, remainingWords)
  }
  if (screen === "countDown")
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
  if (screen === "game")
    return (
      <View>
        <Text style={styles.headerText}>{splainer.name}</Text>
        {round === 2 ? <Text style={styles.headerText}>Enact</Text> : <Text style={styles.headerText}>'Splain</Text>}
        <Text style={styles.headerText}>{remainingWords[0]}</Text>
        {round === 3 ? <Text style={styles.headerText}>With one word</Text> : <View></View>}
        <Text style={styles.headerText}>to {splainer.partner}</Text>
        <TouchableHighlight onPress={addPoint()}>
          <AntDesign name="checkcircle" size={24} color="black" />
          <Text style={{ color: "#ffffff" }}>Got It!</Text>
        </TouchableHighlight>
      </View>
    );
  return (
    ///Final screen (results)
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Score:</Text>
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
        <TouchableHighlight onPress={handleRoundFinished}>
          <Text style={{ color: "#ffffff" }}>Next</Text>
        </TouchableHighlight>
      </View>
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
});
