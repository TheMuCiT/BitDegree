import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6003A0',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 10,
  },
  streakText: {
    fontSize: 24,
    marginBottom: 10,
  },
  accuracyText: {
    fontSize: 24,
    marginBottom: 10,
  },
  multiplierText: {
    fontSize: 24,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red',
  },
  countdown: {
    fontSize: 40,
  },
  tapButton: {
    position: 'relative',
  },
  startButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: 0}, {translateY: 0}],
    width: 100,
  },
  instructionText: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default styles;
