import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HeaderBarProps {
  children?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  children,
}) => {
  const background = '#000';

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        left: 10,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
    },
});
