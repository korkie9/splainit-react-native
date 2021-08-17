import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import GamePlayRules from "../_components/GamePlayRules";
import GameRules from "../_components/GameRules";

const DaRules = ({ navigation }) => {
  [screen, setScreen] = useState("GamePlay")

  const ButtonStyle =  (thisScreen) => {
    return screen === thisScreen ? 
    {
    color: "#ffffff",
    margin: 5,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    height: 40
    } : {
    color: "#ffffff",
    margin: 5,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    height: 40
    }
  }
  return (
    <View style={styles.container}>
      {screen === "GamePlay" && <GamePlayRules />}
      {screen === "GameRules" && <GameRules />}
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ButtonStyle("GameRules")}
        onPress={() => {
          setScreen("GameRules");
        }}
      >
        <Text style={styles.buttonText}>DaRules</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ButtonStyle("GamePlay")}
        onPress={() => {
          setScreen("GamePlay");
        }}
      >
        <Text style={styles.buttonText}>Game Play</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default DaRules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#ffffff",
    margin: 5,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flex: 1,
    marginBottom: 20,
    height: 40
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    marginTop: 40,
    fontFamily: "serif",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginTop: 25,
    fontFamily: "serif",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 15,
    margin: 20,
    fontFamily: "serif",
    textAlign: "center",
  },
});
