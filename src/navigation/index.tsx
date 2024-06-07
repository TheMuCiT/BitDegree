import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNames} from '../shared/Constants/navigationRouteNames';
import GameScreen from '../screen/GameScreen/GameScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WelcomeScreen from '../screen/WelcomeScreen/WelcomeScreen';
import {AppNavigationParamList} from '../shared/Constants/navigation';
import EndGameScreen from '../screen/EndGameScreen/EndGameScreen';
import LeaderboardScreen from '../screen/LeaderboardScreen/LeaderboardScreen';

const Stack = createNativeStackNavigator<AppNavigationParamList>();

const index = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={RootNames.WelcomeScreen}
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={RootNames.GameScreen}
            component={GameScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={RootNames.EndGameScreen}
            component={EndGameScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={RootNames.LeaderboardScreen}
            component={LeaderboardScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default index;
