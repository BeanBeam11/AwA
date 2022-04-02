import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const PlannerScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Planner</Text>
        </View>
    );
}

export default PlannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});