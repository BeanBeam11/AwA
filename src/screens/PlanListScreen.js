import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme, Box } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { PlanList_V } from '../components/PlanList';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTrips } from '../redux/tripSlice';

const PlanListScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const allTrips = useSelector(selectAllTrips);

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'熱門行程'} navigation={navigation} />
            <PlanList_V navigation={navigation} data={allTrips} />
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default PlanListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
});
