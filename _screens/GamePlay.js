import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import Round from "../_components/rounds/Round";

const GamePlay = ({ navigation, route }) => {
  const words = route.params.words;
  const players = route.params.players;
  const noOfTeams = route.params.noOfTeams;
  ////States for Starting
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [countDownCounter, setCountDownCounter] = useState(3);
  const [teams, setTeams] = useState([]);
  const [playersWithPartners, setPlayersWithPartners] = useState([]);
  ///Round States
  const [round, setRound] = useState(1);

  useEffect(() => { //Fix data leak
    startCountDown();
    sortPlayers();
  }, []);

  const startCountDown = () => {
    let c = 3;
    setCountDownCounter(3);
    setIsCountingDown(true);
    const interval = setInterval(() => {
      if (c === -1) {
        setCountDownCounter(3);
        clearInterval(interval);
        setIsCountingDown(false);
        console.log("stopped");
      }
      setCountDownCounter(c);
      console.log(c);
      c -= 1;
    }, 1000);
  };
  const test = () => {
    console.log(noOfTeams);
    console.log(JSON.stringify(teams));
  };
  const sortPlayers = () => {
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
    setTeams(tempTeams);
    //Sort Players with partners
    let tempPlayersWithPartners = []
    tempTeams.map((pteam, index) => {
      
      pteam.map((pplayer, pindex) => {
        if(!pteam[pindex + 1]) {
          tempPlayersWithPartners.push({
            name: pplayer.name,
            teamName: pplayer.teamName,
            partner: pteam[0].name
          })
        } else {
          tempPlayersWithPartners.push({
            name: pplayer.name,
            teamName: pplayer.teamName,
            partner: pteam[pindex + 1].name
          })
        }
      })
    })
    setPlayersWithPartners(tempPlayersWithPartners)
  };
  const RoundOne = () => {
    if (round === 1) return <Round />;
  };
  return (
    <View style={styles.container}>
      {isCountingDown ? (
        <View style={styles.header}>
          <Text style={styles.headerText}>Game Starts in...</Text>
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
      ) : (
        // <Round playersWithPartners={playersWithPartners} words={words} />
        <Button
          title="test"
          onPress={() => {
            console.log(JSON.stringify(playersWithPartners));
          }}
        />
      )}
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
