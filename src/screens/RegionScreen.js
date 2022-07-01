import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { cities } from '../data/cities';
import { SightList } from '../components/SightList';
import { PlanList } from '../components/PlanList';
import Loading from '../components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectCitySpots, selectSpotStatus, getCitySpotsAsync } from '../redux/spotSlice';
import { getCityScenicSpots } from '../api/transportData';

const RegionScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { city } = route.params;
    const [loading, setLoading] = useState(true);
    const [spots, setSpots] = useState([]);

    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const citySpots = useSelector(selectCitySpots);
    const spotStatus = useSelector(selectSpotStatus);

    const region = cities.find((el) => el.city === city);

    useEffect(() => {
        setLoading(true);
        fetchCitySpots();
    }, []);

    const fetchCitySpots = async () => {
        const res = await getCityScenicSpots({ accessToken, city, top: 10, skip: 0 });
        setSpots(res.data);
    };

    useEffect(() => {
        if (spots.length !== 0) {
            setLoading(false);
        }
    }, [spots]);

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
                        <Pressable
                            style={styles.sectionRightBox}
                            onPress={() => navigation.navigate('CitySightScreen', { city, spotsData: spots })}
                        >
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    {!loading ? (
                        spots.length !== 0 && <SightList navigation={navigation} data={spots.slice(0, 5)} />
                    ) : (
                        <Text
                            style={{ fontSize: 16, textAlign: 'center' }}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            ✧*｡٩(ˊᗜˋ*)و✧*｡ 資料整理中...
                        </Text>
                    )}
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
                    <PlanList navigation={navigation} data={null} />
                </Box>
            </ScrollView>
            {loading && <Loading />}
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
