import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './gameScreen.Styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {decrementTime, incrementScore, resetGame} from '../../redux/gameSlice';
import Button from '../../components/Button/Button';
import TapButton from '../../components/TapButton/TapButton';

const GameScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const score = useSelector((state: RootState) => state.game.score);
  const timeLeft = useSelector((state: RootState) => state.game.timeLeft);
  const multiplier = useSelector((state: RootState) => state.game.multiplier);
  const streak = useSelector((state: RootState) => state.game.streak);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => {
      dispatch(decrementTime());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, dispatch]);

  const handleTap = () => {
    if (timeLeft > 0) {
      const currentTime = Date.now();
      let accuracy = 1;
      let speed = 1;

      if (lastTapTime) {
        const timeDifference = (currentTime - lastTapTime) / 1000;
        speed = timeDifference;
        accuracy = 1 - Math.min(timeDifference / 2, 1);
      }

      setLastTapTime(currentTime);
      dispatch(incrementScore({accuracy, speed}));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}</Text>
      <Text style={styles.multiplier}>Multiplier: {multiplier}</Text>
      <Text style={styles.streak}>Streak: {streak}</Text>
      {/* <TapButton onPress={handleTap} />
       */}
      <Button
        title="Tap Me!"
        onPress={handleTap}
        primary={false}
        style={{marginBottom: 10}}
      />
      <Button
        title="Reset"
        onPress={() => {
          dispatch(resetGame());
        }}
        primary={false}
      />
    </View>
  );
};

export default GameScreen;
