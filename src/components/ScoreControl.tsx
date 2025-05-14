import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton';
import { useBleContext } from '../context/BleContext';

interface ScoreControlProps {
    scoreHome: number;
    incrementScoreHome: () => void;
    decrementScoreHome: () => void;
    scoreVisitor: number;
    incrementScoreVisitor: () => void;
    decrementScoreVisitor: () => void;
  }

export const ScoreControl: React.FC<ScoreControlProps> = ({
    scoreHome,
    incrementScoreHome,
    decrementScoreHome,
    scoreVisitor,
    incrementScoreVisitor,
    decrementScoreVisitor,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <ActionButton label="+" onPress={incrementScoreHome} />
                <Text style={styles.scoreText}>{scoreHome}</Text>
                <ActionButton label="-" onPress={decrementScoreHome} />
            </View>

            <View style={styles.block}>
                <ActionButton label="+" onPress={incrementScoreVisitor} />
                <Text style={styles.scoreText}>{scoreVisitor}</Text>
                <ActionButton label="-" onPress={decrementScoreVisitor} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
    },
    block: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#fff',
    },
});