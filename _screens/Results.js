import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const Results = ({ navigation, route }) => {
    const playersAndScores = route.params.playersAndScores
  return (
    <View style={styles.container}>
        <Text>{playersAndScores}</Text>
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
});