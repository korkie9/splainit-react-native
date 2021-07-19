import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

const NewGame = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");

  const addTeam = () => {
    if (team) {
        for(teamL in teams){
            if(team === teamL.name){
                Alert.alert('Please add a team with a different name')
                return
            }
        }
      const id = teams.length + 1;
      setTeams([...teams, { name: team, id: id }]);
    }
  };
  const onTeamChange = (team) => {
    setTeam(team);
  };
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Add Your Teams</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          onChangeText={onTeamChange}
          value={team}
          placeholder="Team Name"
          textAlign='center'
          caretHidden={true}
        />
        <Button onPress={addTeam} title="Add" color="#000000" />
      </View>
      <FlatList
        data={teams}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={(team) => team.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    margin: 10,
  },
  button: {
    color: "#ffffff",
    margin: 5,
    height: 55,
    width: "30%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 30
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
    margin: 10
  },
  inputText: {
      backgroundColor: "#ffffff",
      
      borderRadius: 10,
      margin: 10,
      height: 50,
      width: "50%"
  }
});
