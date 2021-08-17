import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const GamePlay = () => {
  return (
    <ScrollView>
      <Text style={styles.header}>Da Rules</Text>
      <Text style={styles.paragraph}>
        1. When describing words, players may not use the words that are written
        in their description.
      </Text>
      <Text style={styles.paragraph}>
        2. Players may not provide hints as to the letters used in the word or
        phrase they are describing e.g. a player may not say "It sarts with the
        second letter of the alphabet".
      </Text>
      <Text style={styles.paragraph}>
        3. Players may not spell out the word they are describing (obviously)
      </Text>
      <Text style={styles.paragraph}>
        4. Players may, however, provide the full unabreviated form of an
        abreviated phrase and visa versa e.g when describing the abreviation
        ASAP, players may say "It stands for as soon as possible".
      </Text>
      <Text style={styles.paragraph}>
        5. During round 1, players may not use physical body actions to enact
        what is written.
      </Text>
      <Text style={styles.paragraph}>
        6. During round 2, if so much as a sound is uttered with intention to
        communicate something, the player forfeits that round e.g. if a player
        hums to communicate a "yes", that player forfeits their turn.
      </Text>
      <Text style={styles.paragraph}>
        6. During round 3, if a player uses anymore that one word, even to cuss
        or express themselves, that player forfeits their turn e.g. if a player
        sees his word and says "Goodness gracious", simply to express shock,
        that player forfeits their turn.
      </Text>
      <Text style={styles.paragraph}>
        7. During round 3, players may not use physical actions to describe what
        is written.
      </Text>
    </ScrollView>
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
