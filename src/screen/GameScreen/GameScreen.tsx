import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import styles from './gameScreen.Styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import Button from '../../components/Button/Button';
import TapButton from '../../components/TapButton/TapButton';
import {incrementScore} from '../../redux/gameSlice';
import {useTimer} from './useTimer';
import {useNavigation} from '@react-navigation/native';
import {GameNavigationProp} from '../../shared/Constants/navigation';
import {RootNames} from '../../shared/Constants/navigationRouteNames';
import Fireworks from '../../components/Fireworks/Fireworks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const GameScreen = () => {
  const navigation = useNavigation<GameNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {score, totalAccuracy, tapCount, multiplier} = useSelector(
    (state: RootState) => state.game,
  );

  const insets = useSafeAreaInsets();

  const {startTime, time, started, ended, startGame, resetTimer} = useTimer();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStart = () => {
    startGame();
  };

  const handleTap = (accuracy: number) => {
    if (started) {
      dispatch(incrementScore(accuracy));
    }
  };

  useEffect(() => {
    if (ended) {
      setTimeout(() => {
        resetTimer();
        navigation.navigate(RootNames.EndGameScreen, {score});
      }, 1500);
    }
  }, [ended]);

  const averageAccuracy =
    tapCount > 0 ? (totalAccuracy / tapCount).toFixed(1) : 0;

  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: insets.top}} />
      <View style={styles.backButton}>
        <Button onPress={handleBack} title="Back" primary={false} />
      </View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textItem}>
            <Text style={styles.title}>Score</Text>
            <Text style={styles.text}>{score.toFixed(0)}</Text>
          </View>
          <View style={styles.textItem}>
            <Text style={styles.title}>Average Accuracy</Text>
            <Text style={styles.text}>{averageAccuracy}</Text>
          </View>
          <View style={styles.textItem}>
            <Text style={styles.title}>Multiplier</Text>
            <Text style={styles.text}>{multiplier}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.timerText}>Time Left: {time}s</Text>
        </View>
        <View style={styles.mainContainer}>
          {started ? (
            startTime > 0 ? (
              <Text style={styles.countdown}>{startTime}</Text>
            ) : (
              <TapButton onPress={handleTap} />
            )
          ) : !ended ? (
            <Button title="Start" onPress={handleStart} />
          ) : (
            <Fireworks />
          )}
        </View>
      </View>
    </View>
  );
};

export default GameScreen;
