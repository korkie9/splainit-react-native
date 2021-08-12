import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from "react-native";

const Results = ({ navigation, route }) => {
  const [teamsAndScores, setTeamsAndScores] = useState(
    route.params.teamsAndScores
  );
  const [phase, setPhase] = useState("playerPhase");
  const playersAndScores = route.params.playersAndScores;
  const [winners, setWinners] = useState([]);
  const [trash, setTrash] = useState([]);

  useEffect(() => {
    sortTeamsAndScores();
  }, []);

  const sortTeamsAndScores = () => {
    let tempTeamsAndScores = [];
    let highest1 = 0;
    let highest2 = 0;
    let highest3 = 0;
    for (const team of teamsAndScores) {
      if (team.roundOneScore > highest1) highest1 = team.roundOneScore;
      if (team.roundTwoScore > highest2) highest2 = team.roundTwoScore;
      if (team.roundThreeScore > highest3) highest3 = team.roundThreeScore;
    }

    for (const team of teamsAndScores) {
      // const round1Result = team.roundOneScore === highest1 ? 'W' : 'L'
      // const round2Result = team.roundTwoScore === highest2 ? 'W' : 'L'
      // const round3Result = team.roundThreeScore === highest3 ? 'W' : 'L'
      const tempTeamAndScores = {
        teamName: team.teamName,
        roundOneScore: team.roundOneScore,
        roundTwoScore: team.roundTwoScore,
        roundThreeScore: team.roundThreeScore,
        roundOneResult: team.roundOneScore === highest1 ? "W" : "L",
        roundTwoResult: team.roundTwoScore === highest2 ? "W" : "L",
        roundThreeResult: team.roundThreeScore === highest3 ? "W" : "L",
      };
      tempTeamsAndScores.push(tempTeamAndScores);
    }
    let r1Wins = 0;
    let r2Wins = 0;
    let r3Wins = 0;
    tempTeamsAndScores.map((team) => {
      team.roundOneResult === "W" && r1Wins++;
      team.roundTwoResult === "W" && r2Wins++;
      team.roundThreeResult === "W" && r3Wins++;
    });
    let tempTeamsAndScoresWithDraws = [];
    let r1Result = "";
    let r2Result = "";
    let r3Result = "";
    tempTeamsAndScores.map((team) => {
      r1Result = team.roundOneResult;
      r2Result = team.roundTwoResult;
      r3Result = team.roundThreeResult;
      if (team.roundOneResult === "W" && r1Wins > 1) r1Result = "D";
      if (team.roundTwoResult === "W" && r2Wins > 1) r2Result = "D";
      if (team.roundThreeResult === "W" && r3Wins > 1) r3Result = "D";
      const newTeam = {
        teamName: team.teamName,
        roundOneScore: team.roundOneScore,
        roundTwoScore: team.roundTwoScore,
        roundThreeScore: team.roundThreeScore,
        roundOneResult: r1Result,
        roundTwoResult: r2Result,
        roundThreeResult: r3Result,
      };
      tempTeamsAndScoresWithDraws.push(newTeam);
    });
    let tempTeamsAndScoresWithGameScore = [];
    for (const team of tempTeamsAndScoresWithDraws) {
      let gameScore = 0;
      if (team.roundOneResult === "W") gameScore++;
      if (team.roundTwoResult === "W") gameScore++;
      if (team.roundThreeResult === "W") gameScore++;
      if (team.roundOneResult === "D") gameScore += 0.5;
      if (team.roundTwoResult === "D") gameScore += 0.5;
      if (team.roundThreeResult === "D") gameScore += 0.5;
      const tempTeamAndScores = {
        teamName: team.teamName,
        roundOneScore: team.roundOneScore,
        roundTwoScore: team.roundTwoScore,
        roundThreeScore: team.roundThreeScore,
        roundOneResult: team.roundOneResult,
        roundTwoResult: team.roundTwoResult,
        roundThreeResult: team.roundThreeResult,
        total: team.roundOneScore + team.roundTwoScore + team.roundThreeScore,
        gameScore: gameScore,
      };
      tempTeamsAndScoresWithGameScore.push(tempTeamAndScores);
    }
    setTeamsAndScores(tempTeamsAndScoresWithGameScore);
    findWinners(tempTeamsAndScoresWithGameScore);
    findTrash(tempTeamsAndScoresWithGameScore);
  };
  const findWinners = (teams) => {
    let mostWins = 0;
    let mostPoints = 0;
    teams.map((team) => {
      if (team.gameScore > mostWins) mostWins = team.gameScore;
    });
    const tempTeamsAndWins = teams.filter(
      (team) => team.gameScore === mostWins
    );

    tempTeamsAndWins.map((team) => {
      if (team.total > mostPoints) mostPoints = team.total;
    });
    const tempWinners = tempTeamsAndWins.filter(
      (team) => team.total === mostPoints
    );
    setWinners(tempWinners);
  };
  const findTrash = (teams) => {
    let leastWins = teams[0].gameScore;
    let leastPoints = teams[0].total;
    teams.map((team) => {
      if (team.gameScore < leastWins) leastWins = team.gameScore;
    });
    const tempTeamsAndLosses = teams.filter(
      (team) => team.gameScore === leastWins
    );
    tempTeamsAndLosses.map((team) => {
      if (team.total < leastPoints) leastPoints = team.total;
    });
    const tempTrash = tempTeamsAndLosses.filter(
      (team) => team.total === leastPoints
    );
    setTrash(tempTrash);
  };
  const playerCard = (p) => {
    let total = 0;
    if (p.roundOneScore) total += p.roundOneScore;
    if (p.roundTwoScore) total += p.roundTwoScore;
    if (p.roundThreeScore) total += p.roundThreeScore;
    return (
      <View style={styles.itemCard}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
          }}
        >
          <Text
            style={{
              backgroundColor: "#bf3030",
              width: 300,
              textAlign: "center",
            }}
          >
            {p.name}
          </Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 1</Text>
          <Text style={{ flex: 1 }}>
            {p.roundOneScore ? p.roundOneScore : "0"}
          </Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 2</Text>
          <Text style={{ flex: 1 }}>
            {p.roundTwoScore ? p.roundTwoScore : "0"}
          </Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 3</Text>
          <Text style={{ flex: 1 }}>
            {p.roundThreeScore ? p.roundThreeScore : "0"}
          </Text>
        </View>
        <View
          style={{
            fontFamily: "serif",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "row",
            padding: 2,
            backgroundColor: "#e6b5b5",
          }}
        >
          <Text style={{ flex: 1 }}>Total</Text>
          <Text style={{ flex: 1 }}>{total}</Text>
        </View>
      </View>
    );
  };
  const teamCard = (t) => {
    return (
      <View style={styles.itemCard}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#bf3030",
              width: 300,
              textAlign: "center",
            }}
          >
            {t.teamName}
          </Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 1</Text>
          <Text style={{ flex: 1 }}>
            {t.roundOneScore ? t.roundOneScore : "0"}
          </Text>
          <Text style={{ flex: 1 }}>{t.roundOneResult}</Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 2</Text>
          <Text style={{ flex: 1 }}>
            {t.roundTwoScore ? t.roundTwoScore : "0"}
          </Text>
          <Text style={{ flex: 1 }}>{t.roundTwoResult}</Text>
        </View>
        <View style={styles.roundText}>
          <Text style={{ flex: 1 }}>Round 3</Text>
          <Text style={{ flex: 1 }}>
            {t.roundThreeScore ? t.roundThreeScore : "0"}
          </Text>
          <Text style={{ flex: 1 }}>{t.roundThreeResult}</Text>
        </View>
        <View
          style={{
            fontFamily: "serif",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "row",
            padding: 2,
            backgroundColor: "#e6b5b5",
          }}
        >
          <Text style={{ flex: 1 }}>Total</Text>
          <Text style={{ flex: 1 }}>{t.total}</Text>
          <Text style={{ flex: 1 }}>{t.gameScore}</Text>
        </View>
      </View>
    );
  };
  if (phase === "playerPhase")
    return (
      <View style={styles.container}>
        {/*Players scores */}
        <Text style={styles.header}>Player Results</Text>
        <FlatList
          data={playersAndScores}
          renderItem={({ item }) => playerCard(item)}
          keyExtractor={(player) => player.name.toString()}
        />
        <TouchableOpacity
          onPress={() => {
            setPhase("teamPhase");
          }}
          style={{ marginBottom: 50 }}
        >
          <AntDesign name="rightsquare" size={50} color="black" />
        </TouchableOpacity>
      </View>
    );
  if (phase === "teamPhase")
    return (
      <View style={styles.container}>
        {/*Players scores */}
        <Text style={styles.header}>Team Results</Text>
        <FlatList
          data={teamsAndScores}
          renderItem={({ item }) => teamCard(item)}
          keyExtractor={(team) => team.teamName.toString()}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setPhase("playerPhase");
            }}
            style={{ marginBottom: 50 }}
          >
            <AntDesign name="leftsquare" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPhase("winnerTrashPhase");
            }}
            style={{ marginBottom: 50 }}
          >
            <AntDesign name="rightsquare" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  if (phase === "winnerTrashPhase")
    return (
      <View style={styles.container}>
        {/*Winners */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>Winners</Text>
          <MaterialCommunityIcons
            style={{ marginTop: 40 }}
            name="medal"
            size={40}
            color="white"
          />
        </View>
        <FlatList
          data={winners}
          renderItem={({ item }) => teamCard(item)}
          keyExtractor={(team) => team.teamName.toString()}
        />

        {/*Losers */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>Trash</Text>
          <Entypo
            style={{ marginTop: 40 }}
            name="trash"
            size={40}
            color="black"
          />
          <FontAwesome5
            style={{ marginTop: 55 }}
            name="poop"
            size={24}
            color="black"
          />
        </View>
        <FlatList
          data={trash}
          renderItem={({ item }) => teamCard(item)}
          keyExtractor={(team) => team.teamName.toString()}
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setPhase("teamPhase");
            }}
            style={{ marginBottom: 50 }}
          >
            <AntDesign name="leftsquare" size={50} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("Home", {})}} style={styles.nextButton}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(130, 22, 22)",
    alignItems: "center",
    justifyContent: "center",
  },
  itemCard: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 300,
    margin: 10,
    borderRadius: 7,
  },
  roundText: {
    fontFamily: "serif",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    flexDirection: "row",
    padding: 2,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    marginTop: 40,
    fontFamily: "serif",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#000000",
    height: 50,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
