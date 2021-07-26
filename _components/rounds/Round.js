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

const Round = (props) => {
  
  return (
    <View style={styles.container}>
       <Text>{JSON.stringify(props.playersWithPartners)}</Text> 
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