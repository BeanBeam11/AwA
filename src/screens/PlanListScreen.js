import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useColorMode, useTheme, Box } from 'native-base';
import { GoBackHeader } from '../components/Header';
import { Plan_H } from '../components/Plan_H';
import { getAllTrips } from '../api';

const PlanListScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        fetchAllTrips(pageNum);
    }, [pageNum]);

    const fetchAllTrips = async (pageNumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const res = await getAllTrips({ page: pageNumber, limit: 6 });
        if (res.data.data.length === 0) setIsEnd(true);
        const result = res.data.data.filter((el) => el.trips[0].length !== 0);
        setTrips([...trips, ...result]);
        setLoading(false);
    };

    const handleReachEnd = () => {
        if (!isEnd && !loading) {
            setPageNum((num) => num + 1);
        }
    };

    const renderItem = ({ item }) => {
        return <Plan_H item={item} navigation={navigation} />;
    };

    const renderFooter = () => {
        return loading && <ActivityIndicator />;
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'熱門行程'} navigation={navigation} />
            <FlatList
                data={trips.filter((el) => el.trips[0].length !== 0)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 15, paddingBottom: 100 }}
                ListFooterComponent={renderFooter}
                onEndReached={handleReachEnd}
                onEndReachedThreshold={0.5}
            />
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
