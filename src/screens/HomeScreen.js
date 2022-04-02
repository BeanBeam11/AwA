import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});