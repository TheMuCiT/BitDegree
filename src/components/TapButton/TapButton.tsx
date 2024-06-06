import {
  Text,
  GestureResponderEvent,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import React, {useState} from 'react';
import styles from './tapButton.styles';

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

  const getColor = (distance: number, radius: number): string => {
    if (distance < radius * 0.5) return 'green';
    else if (distance < radius * 0.8) return 'yellow';
    else return 'red';
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (!buttonRadius) return;

    const {locationX, locationY} = event.nativeEvent;
    const centerX = buttonRadius;
    const centerY = buttonRadius;
    const distance = Math.sqrt(
      Math.pow(locationX - centerX, 2) + Math.pow(locationY - centerY, 2),
    );
    const accuracy = getColor(distance, buttonRadius);

    let accuracyValue = 0;
    switch (accuracy) {
      case 'green':
        accuracyValue = 1;
        break;
      case 'yellow':
        accuracyValue = 0.6;
        break;
      case 'red':
        accuracyValue = 0.1;
        break;
      default:
        break;
    }

    console.log(accuracy);
    onPress(accuracyValue);
  };

  return (
    <TouchableOpacity
      onLayout={handleLayout}
      style={styles.button}
      onPress={handlePress}>
      <Text style={styles.buttonText}>Tap Me!</Text>
    </TouchableOpacity>
  );
};

export default TapButton;
