import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

interface HeaderBarProps {
  onScanDevices: () => void;
  onResetScore: () => void;
  onToggleMode: () => void;
  isTournament: boolean;
  time: string;
  children?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onScanDevices,
  onResetScore,
  onToggleMode,
  isTournament,
  time,
  children,
}) => {
  const background = '#000';

  return (
    <View style={[styles.container, { backgroundColor: background }]}>

      {children}

      <TouchableOpacity style={styles.button} onPress={onResetScore}>
        <Text style={styles.buttonText}>Zerar placar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onToggleMode}>
        <Text style={styles.buttonText}>
          {isTournament ? 'Modo Casual' : 'Modo Torneio'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.timeText}>{time}</Text>
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
    button: {
        backgroundColor: '#444',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    timeText: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
});
