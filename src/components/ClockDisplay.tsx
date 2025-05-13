import { Text, StyleSheet } from "react-native";


interface ClockDisplayProps {
    time: string;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ time }) => {
    return (
        <Text style={styles.timeText}>{time}</Text>
    );
}

const styles = StyleSheet.create({
    timeText: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        fontWeight: '600',
    },
});

export default ClockDisplay;