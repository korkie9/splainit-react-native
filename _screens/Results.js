import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

  const setTeamPhase = () => {
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
    let tempTeamsAndScoresWithGameScore = [];
    for (const team of tempTeamsAndScores) {
      let gameScore = 0;
      if (team.roundOneResult === "W") gameScore++;
      if (team.roundTwoResult === "W") gameScore++;
      if (team.roundThreeResult === "W") gameScore++;
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
    setPhase("teamPhase");
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
        <TouchableHighlight
          onPress={() => {
            setTeamPhase();
          }}
          style={styles.nextButton}
        >
          <Text style={{ color: "#ffffff" }}>Next</Text>
        </TouchableHighlight>
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
        <TouchableHighlight onPress={() => {}} style={styles.nextButton}>
          <Text style={{ color: "#ffffff" }}>Next</Text>
        </TouchableHighlight>
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
    marginTop: 30,
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
    margin: 15,
  },
});
