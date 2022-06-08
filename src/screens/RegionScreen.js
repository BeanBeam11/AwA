import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { cities } from '../data/cities';
import { SightList } from '../components/SightList';
import { PlanList } from '../components/PlanList';

const RegionScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { city } = route.params;

    const region = cities.find((el) => el.city === city);

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <GoBackHeader title={''} navigation={navigation} />
                <Box style={styles.regionHeader}>
                    <Image source={region.map} style={styles.mapImage} resizeMode="cover" />
                    <Box style={styles.regionTitle}>
                        <Text
                            style={styles.regionCity}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {region.city}
                        </Text>
                        <Text
                            style={styles.regionName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {region.name}
                        </Text>
                    </Box>
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {region.city}景點
                        </Text>
                        <Pressable style={styles.sectionRightBox}>
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <SightList navigation={navigation} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            推薦行程
                        </Text>
                        <Pressable style={styles.sectionRightBox}>
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <PlanList navigation={navigation} />
                </Box>
            </ScrollView>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default RegionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    regionHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 10,
    },
    mapImage: {
        width: 100,
        height: 120,
    },
    regionTitle: {
        alignItems: 'center',
        marginLeft: 40,
        minWidth: 140,
    },
    regionCity: {
        fontSize: 40,
        lineHeight: 46,
    },
    regionName: {
        fontSize: 32,
        lineHeight: 42,
    },
    sectionWrapper: {
        marginBottom: 30,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 24,
    },
    sectionRightBox: {
        marginLeft: 'auto',
    },
    sectionTitleRight: {
        fontSize: 14,
        fontWeight: '500',
    },
});
