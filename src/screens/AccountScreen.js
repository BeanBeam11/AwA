import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const AccountScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Account</Text>
        </View>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});