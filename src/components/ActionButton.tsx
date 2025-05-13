import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ActionButtonProps {
  label: string;
  backgroundColor?: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  backgroundColor,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        backgroundColor ? { backgroundColor } : undefined,
        style,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#444',
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ActionButton;
