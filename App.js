import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./_screens/Home";
import NewGame from "./_screens/NewGame"
import Players from "./_screens/Players"
import PlayersPerTeam from "./_screens/PlayersPerTeam"
import WordsPerPlayer from "./_screens/WordsPerPlayer"
import Words from "./_screens/Words"
import GamePlay from "./_screens/GamePlay"
import Results from "./_screens/Results"
import Round from "./_screens/Round"
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float"
        animation="fade"
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewGame" component={NewGame} options={{title: 'Add Teams'}}/>
        <Stack.Screen name="Players" component={Players} options={{title: 'Add Players'}}/>
        <Stack.Screen name="PlayersPerTeam" component={PlayersPerTeam} options={{title: 'Number of Players Per Team'}}/>
        <Stack.Screen name="WordsPerPlayer" component={WordsPerPlayer} options={{title: 'Number of Words Per Player'}}/>
        <Stack.Screen name="Words" component={Words} options={{title: 'Choose Your Words'}}/>
        <Stack.Screen name="GamePlay" component={GamePlay} options={{title: `'Splainit`}}/>
        <Stack.Screen name="Round" component={Round} options={{title: `'Splainit`}}/>
        <Stack.Screen name="Results" component={Results} options={{title: 'Results'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
