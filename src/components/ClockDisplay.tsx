import { Text, StyleSheet } from "react-native";
import { useClockContext } from "../context/ClockContext";


const ClockDisplay: React.FC = () => {
    const { currentTime } = useClockContext();

    return (
        <Text style={styles.timeText}>{currentTime}</Text>
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