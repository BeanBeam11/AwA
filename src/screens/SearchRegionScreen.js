import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { CityListVertical } from '../components/CityList';
import { GoBackHeader } from '../components/Header';

const SearchRegionScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'地區'} navigation={navigation} />
            <Box style={styles.descriptionWrapper}>
                <Text style={styles.description} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    - 請選擇要探索的地區 -
                </Text>
            </Box>
            <Box style={styles.cityWrapper}>
                <CityListVertical navigation={navigation} />
            </Box>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default SearchRegionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
        alignItems: 'center',
    },
    descriptionWrapper: {
        marginBottom: 36,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
    },
    cityWrapper: {
        paddingLeft: 10,
    },
});
