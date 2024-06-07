import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ParticleProps {
  x: number;
  y: number;
}

const Particle = ({x, y}: ParticleProps) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 100,
    });
    translateY.value = withTiming(-200, {
      duration: 2500,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.particle, {left: x, bottom: y}, animatedStyle]}
    />
  );
};

const Fireworks = () => {
  const particles: {x: number; y: number}[] = [];

  for (let i = 0; i < 80; i++) {
    const x = Math.floor(Math.random() * 600) - 300;
    const y = Math.floor(Math.random() * 900) - 200;
    particles.push({x, y});
  }

  return (
    <View style={styles.container}>
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'yellow',
  },
});

export default Fireworks;
