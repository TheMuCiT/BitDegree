import {GestureResponderEvent, LayoutChangeEvent, View} from 'react-native';
import React, {useState} from 'react';
import styles from './tapButton.styles';
import Svg, {Circle} from 'react-native-svg';

interface TapButtonProps {
  onPress: (accuracy: number) => void;
}

const TapButton = ({onPress}: TapButtonProps) => {
  const [buttonRadius, setButtonRadius] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    const radius = Math.min(width, height) / 2;
    setButtonRadius(radius);
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (!buttonRadius) return;

    const {locationX, locationY} = event.nativeEvent;
    const centerX = buttonRadius;
    const centerY = buttonRadius;
    const distance = Math.sqrt(
      Math.pow(locationX - centerX, 2) + Math.pow(locationY - centerY, 2),
    );

    const zones: [number, number][] = [
      [0.2, 1],
      [0.4, 0.8],
      [0.6, 0.6],
      [0.8, 0.4],
      [1, 0.1],
    ];

    const accuracy =
      zones.find(([threshold]) => distance <= buttonRadius * threshold)?.[1] ||
      0;

    onPress(accuracy);
  };

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
      onTouchEnd={handlePress}>
      {buttonRadius && (
        <Svg height={buttonRadius * 2} width={buttonRadius * 2}>
          <Circle
            cx={buttonRadius}
            cy={buttonRadius}
            r={buttonRadius - 2}
            fill="none"
            stroke="#6B65DF"
            strokeWidth={2}
          />
          <Circle
            cx={buttonRadius}
            cy={buttonRadius}
            r={buttonRadius * 0.8 - 2}
            fill="none"
            stroke="#6B65DF"
            strokeWidth={2}
          />
          <Circle
            cx={buttonRadius}
            cy={buttonRadius}
            r={buttonRadius * 0.6 - 2}
            fill="none"
            stroke="#6B65DF"
            strokeWidth={2}
          />
          <Circle
            cx={buttonRadius}
            cy={buttonRadius}
            r={buttonRadius * 0.4 - 2}
            fill="none"
            stroke="#6B65DF"
            strokeWidth={2}
          />
          <Circle
            cx={buttonRadius}
            cy={buttonRadius}
            r={buttonRadius * 0.2 - 2}
            fill="#6B65DF"
          />
        </Svg>
      )}
    </View>
  );
};

export default TapButton;
