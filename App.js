import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./_screens/Home";
import NewGame from "./_screens/NewGame"
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewGame" component={NewGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
