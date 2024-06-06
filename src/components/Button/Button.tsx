import {Text, Pressable, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import styles from './button.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({title, onPress, primary = true, style}: ButtonProps) => {
  const buttonStyle = primary ? styles.primaryButton : styles.secondaryButton;
  const textStyle = primary ? styles.primaryText : styles.secondaryText;
  return (
    <Pressable style={[buttonStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default Button;
