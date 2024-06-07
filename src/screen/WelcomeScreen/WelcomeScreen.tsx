import {View, Text} from 'react-native';
import React from 'react';
import styles from './welcomeScreen.Styles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {WelcomeNavigationProp} from '../../shared/Constants/navigation';
import {RootNames} from '../../shared/Constants/navigationRouteNames';

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();
  const handlePlay = () => {
    navigation.navigate(RootNames.GameScreen);
  };

  const handleLeaderboard = () => {
    navigation.navigate(RootNames.LeaderboardScreen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tapper Game</Text>
      <View style={styles.buttonContainer}>
        <Button title="Play" onPress={handlePlay} />
        <Button title="Leaderboard" onPress={handleLeaderboard} />
      </View>
    </View>
  );
};

export default WelcomeScreen;
