import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNames} from './navigationRouteNames';
import {RouteProp} from '@react-navigation/native';

export type AppNavigationParamList = {
  [RootNames.WelcomeScreen]: undefined;
  [RootNames.GameScreen]: undefined;
  [RootNames.EndGameScreen]: {score: number};
  [RootNames.LeaderboardScreen]: undefined;
};

export type WelcomeNavigationProp = NativeStackNavigationProp<
  AppNavigationParamList,
  RootNames.WelcomeScreen
>;

export type GameNavigationProp = NativeStackNavigationProp<
  AppNavigationParamList,
  RootNames.GameScreen
>;
export type EndGameNavigationProp = NativeStackNavigationProp<
  AppNavigationParamList,
  RootNames.EndGameScreen
>;

export type EndGameRouteProp = RouteProp<
  AppNavigationParamList,
  RootNames.EndGameScreen
>;
export type LeaderboardNavigationProp = NativeStackNavigationProp<
  AppNavigationParamList,
  RootNames.LeaderboardScreen
>;
