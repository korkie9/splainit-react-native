import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const GamePlay = () => {
  return (
    <ScrollView>
      <Text style={styles.header}>Game Play</Text>
      <Text style={styles.paragraph}>
        1. Sort players into equal sized teams
      </Text>
      <Text style={styles.paragraph}>
        2. Choose a name for each respective team
      </Text>
      <Text style={styles.paragraph}>
        3. Decided how many words (or phrases) players get to write
      </Text>
      <Text style={styles.paragraph}>
        4. Players take turns typing in their words making sure other players
        don't see it
      </Text>
      <Text style={styles.paragraph}>
        5. Once all words are written, pass the phone to the starting player
      </Text>
      <Text style={styles.paragraph}>
        6. The player then has 30 seconds to describe what is written to their
        partners
      </Text>

      <Text style={styles.paragraph}>
        7. If The player's partners guess the word they are describing, that
        words is added to their points and removed from the pool of words for
        that round
      </Text>
      <Text style={styles.paragraph}>
        8. Once their 30 has run out, the player with the phone then passes the
        phone to the next player and step 6 and 7 are repeated till all words in
        the pool have been removed
      </Text>
      <Text style={styles.paragraph}>
        9. Once all the words are removed from the pool, the team with the most
        points for that round wins that round and the next round commences
      </Text>
      <Text style={styles.paragraph}>
        10. In round 2, play continues the same as round 1 except that the
        player who's turn it is to explain may only enact what the word is
        without saying a word.
      </Text>
      <Text style={styles.paragraph}>
        11. In round 3, play continues the same as round 1 and 2 except that the
        player who's turn it is to explain may only describe what is wrtten with
        one word.
      </Text>
      <Text style={styles.paragraph}>
        12. Once all rounds are completed, the team wiht the most rounds won,
        wins.
      </Text>
      <Text style={styles.paragraph}>
        13. If there are teams with the same amount of points, the overall
        amount of points scored throughout the whole game is used as a tiebreak.
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
