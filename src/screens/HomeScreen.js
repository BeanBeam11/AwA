import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { CityListHorizontal } from '../components/CityList';
import { SightList } from '../components/SightList';
import { PlanList } from '../components/PlanList';
import { SearchBar } from '../components/SearchBar';
import { News } from '../components/News';
import Loading from '../components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/accountSlice';
import { selectAccessToken, selectRecommendSpots, selectSpotStatus, getRecommendSpotsAsync } from '../redux/spotSlice';
import {
    selectAllTrips,
    selectTripStatus,
    getAllTripsAsync,
    getUserTripsAsync,
    getUserSharedTripsAsync,
    getUserSavedTripsAsync,
} from '../redux/tripSlice';

const HomeScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [spots, setSpots] = useState([]);
    const [trips, setTrips] = useState([]);

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const accessToken = useSelector(selectAccessToken);
    const recommendSpots = useSelector(selectRecommendSpots);
    const spotStatus = useSelector(selectSpotStatus);
    const allTrips = useSelector(selectAllTrips);
    const tripStatus = useSelector(selectTripStatus);

    useEffect(() => {
        dispatch(getRecommendSpotsAsync({ accessToken }));
        dispatch(getAllTripsAsync());
        dispatch(getUserTripsAsync({ token, userId: user._id }));
        dispatch(getUserSharedTripsAsync({ token, userId: user._id }));
        dispatch(getUserSavedTripsAsync({ token, userId: user._id }));
    }, []);

    useEffect(() => {
        if (spotStatus == 'loading') {
            setLoading(true);
        } else if (spotStatus == 'error') {
            setLoading(false);
        } else if (spotStatus == 'idle') {
            setSpots(recommendSpots);
            if (spots) setLoading(false);
        }
    }, [spotStatus]);

    useEffect(() => {
        if (tripStatus == 'loading') {
            setLoading(true);
        } else if (tripStatus == 'error') {
            setLoading(false);
        } else if (tripStatus == 'idle') {
            setTrips(allTrips);
            if (trips) setLoading(false);
        }
    }, [tripStatus]);

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box style={styles.header}>
                    <Text style={styles.headerText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        探索
                    </Text>
                    <Pressable onPress={() => alert('怎麼還沒有通知 (눈‸눈)')}>
                        <MaterialIcon name="notifications" size={24} color={colors.primary[100]} />
                    </Pressable>
                </Box>
                <SearchBar style={styles.searchBar} placeholder={'搜尋景點、行程'} />
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            地區
                        </Text>
                        <Pressable
                            style={styles.sectionRightBox}
                            onPress={() => navigation.navigate('SearchRegionScreen')}
                        >
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <CityListHorizontal navigation={navigation} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            推薦景點
                        </Text>
                        <Pressable
                            style={styles.sectionRightBox}
                            onPress={() => navigation.navigate('RecommendSightScreen')}
                        >
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    {spots.length !== 0 ? (
                        <SightList navigation={navigation} data={spots.slice(0, 5)} />
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
                            熱門行程
                        </Text>
                        <Pressable style={styles.sectionRightBox} onPress={() => navigation.navigate('PlanListScreen')}>
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <PlanList navigation={navigation} data={allTrips.slice(0, 5)} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>最新消息</Text>
                    </Box>
                    <News style={{ marginHorizontal: 24 }} />
                </Box>
            </ScrollView>
            {loading && <Loading />}
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    header: {
        width: '100%',
        height: 65,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 12,
        marginTop: 44,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '500',
        marginRight: 'auto',
    },
    searchBar: {
        marginBottom: 20,
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
