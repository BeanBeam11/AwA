import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const ShareScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Share</Text>
        </View>
    );
}

export default ShareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});