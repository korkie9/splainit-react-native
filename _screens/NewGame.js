import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NewGame = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");

  const addTeam = () => {
    let teamExists = null
    teams.map(t => {
      if(t === team) teamExists = true
    })
    if (team && !teamExists) {
     // const id = teams.length + 1;
      setTeams([...teams, team]);
      setTeam("");
    } else {
      Alert.alert('Please add a unique team name')
    }
  };
  const removeTeam = (name) => {
    const newTeams = teams.filter(team => team != name)
    setTeams(newTeams)
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
  const addButton = () =>
    team
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
  const nextScreen = () => {
    if(teams.length < 2) return Alert.alert('Please add at least 2 teams')
    navigation.navigate('PlayersPerTeam', {teams: teams})
  }
  const NextButton = () => {
    return (
      <TouchableHighlight style={styles.nextButton} onPress={() => nextScreen()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableHighlight>
    )
  }
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
        <TouchableHighlight onPress={addTeam} style={addButton()} disabled={team ? false : true}>
          <Text style={{ color: "#ffffff" }}>Add</Text>
        </TouchableHighlight>
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
    marginTop: 30,
    fontFamily: 'serif',
    textAlign: 'center'
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
