import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Audio } from 'expo-av';
import click from "../assets/click.m4a";
import ohnose from "../assets/ohnose.m4a"

const NewGame = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [sound, setSound] = useState();
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (track) => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(track);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  };
  const addTeam = () => {
    if(!team.trim()) return Alert.alert("Please add a team")
    let teamExists = null;
    teams.map((t) => {
      if (t === team) teamExists = true;
    });
    if (team && !teamExists) {
      playSound(click)
      setTeams([...teams, team.trim()]);
      setTeam("");
    } else {
      Alert.alert("Please add a unique team name");
    }
  };
  const removeTeam = (name) => {
    playSound(ohnose)
    const newTeams = teams.filter((team) => team != name);
    setTeams(newTeams);
  };
  const onTeamChange = (team) => {
    setTeam(team);
  };
  const teamCard = (name) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemCardText}>
          <Text>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeTeam(name)}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  const nextScreen = () => {
    if (teams.length < 2) return Alert.alert("Please add at least 2 teams");
    playSound(click)
    navigation.navigate("PlayersPerTeam", { teams: teams });
  };
  const NextButton = () => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => nextScreen()}
      >
        <FontAwesome name="chevron-circle-right" size={70} color="black" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Your Teams</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          onChangeText={onTeamChange}
          value={team}
          placeholder="Type Team Name..."
          textAlign="center"
          caretHidden={true}
        />
        <TouchableOpacity onPress={addTeam} disabled={team ? false : true}>
          {team ? (
            <AntDesign name="checkcircle" size={40} color="black" />
          ) : (
            <AntDesign name="checkcircle" size={40} color="grey" />
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={teams}
        renderItem={({ item }) => teamCard(item)}
        keyExtractor={(team) => team.toString()}
      />
      <NextButton />
    </View>
  );
};

export default NewGame;

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
    marginTop: 60,
    fontFamily: "serif",
    textAlign: "center",
  },
  nextButton: {
    color: "#ffffff",
    margin: 5,
    height: 55,
    width: "30%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 30,
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
  inputText: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: "50%",
  },
  itemCard: {
    justifyContent: "center",
    flexDirection: "row",
  },
  itemCardText: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 10,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
