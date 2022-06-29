import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { Sight_H } from '../components/Sight_H';

import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/spotSlice';
import { getCityScenicSpots } from '../api/transportData';

const CitySightScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { city, spotsData } = route.params;

    const accessToken = useSelector(selectAccessToken);

    const [loading, setLoading] = useState(false);
    const [spots, setSpots] = useState(spotsData);
    const [skipNum, setSkipNum] = useState(10);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        fetchCitySpots(skipNum);
    }, [skipNum]);

    const fetchCitySpots = async (skipNumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const res = await getCityScenicSpots({ accessToken, city, top: 10, skip: skipNumber });
        if (res.data.length === 0) setIsEnd(true);
        setSpots([...spots, ...res.data]);
        setLoading(false);
    };

    const handleReachEnd = () => {
        if (!isEnd && !loading) {
            setSkipNum((num) => num + 10);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <Sight_H
                item={item}
                navigation={navigation}
                style={{ marginBottom: 10 }}
                onPress={() => navigation.navigate('SightScreen', { spot: item })}
            />
        );
    };

    const renderFooter = () => {
        return loading && <ActivityIndicator />;
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'推薦景點'} navigation={navigation} />
            <Box style={styles.listWrapper}>
                <FlatList
                    data={spots}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleReachEnd}
                    onEndReachedThreshold={0.5}
                />
            </Box>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default CitySightScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    listWrapper: {
        paddingHorizontal: 24,
    },
});
