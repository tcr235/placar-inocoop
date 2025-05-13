import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    const backgroundColor = '#000';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent',
    },
});

export default LayoutWrapper;