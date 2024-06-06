import {View, Text} from 'react-native';
import React from 'react';
import styles from './gameScreen.Styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import Button from '../../components/Button/Button';
import TapButton from '../../components/TapButton/TapButton';
import {incrementScore, resetScore} from '../../redux/gameSlice';
import {useTimer} from './useTimer';

const GameScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {score, streak, totalAccuracy, tapCount, multiplier} = useSelector(
    (state: RootState) => state.game,
  );

  const {startTime, time, started, startGame, resetTimer} = useTimer();

  const handleStart = () => {
    startGame();
  };

  const handleTap = (accuracy: number) => {
    if (started) {
      dispatch(incrementScore(accuracy));
    }
  };

  const handleReset = () => {
    resetTimer();
    dispatch(resetScore());
  };

  const averageAccuracy =
    tapCount > 0 ? (totalAccuracy / tapCount).toFixed(1) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score.toFixed(0)}</Text>
      <Text style={styles.streakText}>Streak: {streak}</Text>
      <Text style={styles.accuracyText}>
        Average Accuracy: {averageAccuracy}
      </Text>
      <Text style={styles.multiplierText}>Multiplier: {multiplier}x</Text>
      <Text style={styles.timerText}>Time Left: {time}s</Text>
      {started ? (
        startTime > 0 ? (
          <Text style={styles.countdown}>{startTime}</Text>
        ) : (
          <TapButton onPress={handleTap} />
        )
      ) : (
        <Button title="Start" onPress={handleStart} />
      )}

      <Button title="Reset" onPress={handleReset} />
      <Text style={styles.instructionText}>Tap the button to earn points!</Text>
    </View>
  );
};

export default GameScreen;
