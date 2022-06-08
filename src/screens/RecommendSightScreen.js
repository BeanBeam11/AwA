import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { SightList_V } from '../components/SightList';
import sightData from '../json/recommendSight.json';

const RecommendSightScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'推薦景點'} navigation={navigation} />
            <Box style={styles.listWrapper}>
                <SightList_V navigation={navigation} data={sightData} />
            </Box>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default RecommendSightScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    listWrapper: {
        paddingHorizontal: 24,
    },
});
