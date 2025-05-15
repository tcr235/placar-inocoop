import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                <TouchableOpacity style={styles.button} onPress={incrementScoreHome}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decrementScoreHome}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textBlock}>
                <Text style={styles.scoreText}>{scoreHome}</Text>
            </View>
            <View style={styles.textBlock}>
                <Text style={styles.scoreText}>{scoreVisitor}</Text>
            </View>
            <View style={styles.block}>
                <TouchableOpacity style={styles.button} onPress={incrementScoreVisitor}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={decrementScoreVisitor}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
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
    },
    block: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        width: 'auto',
    },
    textBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        width: '30%',
    },
    scoreText: {
        fontSize: 70,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#fff',
        width: '50%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#000',
        marginVertical: 2,
        paddingHorizontal: 50,
        width: '100%',
    },
    buttonText: {
        color: '#ff0',
        fontSize: 100,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});