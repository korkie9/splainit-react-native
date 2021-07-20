import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./_screens/Home";
import NewGame from "./_screens/NewGame"
import Players from "./_screens/Players"
import PlayersPerTeam from "./_screens/PlayersPerTeam"
import WordsPerPlayer from "./_screens/WordsPerPlayer"

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
