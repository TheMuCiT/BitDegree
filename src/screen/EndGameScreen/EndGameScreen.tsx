import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './endGameScreen.Styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  EndGameNavigationProp,
  EndGameRouteProp,
} from '../../shared/Constants/navigation';
import Button from '../../components/Button/Button';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {resetScore} from '../../redux/gameSlice';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const EndGameScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<EndGameNavigationProp>();
  const route = useRoute<EndGameRouteProp>();

  const insets = useSafeAreaInsets();

  const [topScores, setTopScores] = useState<number[]>([]);

  const score = route.params.score;

  useEffect(() => {
    const saveScore = async () => {
      try {
        const existingScores = await AsyncStorage.getItem('scores');
        const scores = existingScores ? JSON.parse(existingScores) : [];

        if (scores.length < 30 || score > scores[scores.length - 1]) {
          scores.push(score);
          scores.sort((a: number, b: number) => b - a);
          if (scores.length > 30) {
            scores.pop();
          }
          setTopScores(scores);
          await AsyncStorage.setItem('scores', JSON.stringify(scores));
        }
      } catch (error) {
        console.error('Failed to save score', error);
      }
    };

    saveScore();
  }, [score]);

  const handleReset = () => {
    dispatch(resetScore());
    navigation.goBack();
  };

  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: insets.top}} />
      <View style={styles.container}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.score}>Your Score: {score.toFixed(0)}</Text>

        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>Top 10 scores</Text>
          <Leaderboard topScores={topScores} newScore={score} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleReset} title="Try Again!" />
        </View>
      </View>
    </View>
  );
};

export default EndGameScreen;
