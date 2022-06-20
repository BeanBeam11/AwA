import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Dimensions, FlatList } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlanDetailHeader, PlanDetailSaveHeader } from '../components/Header';
import Loading from '../components/Loading';
import { formatDate, formatTime } from '../utils/formatter';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/accountSlice';
import { selectUserTrips, selectTripStatus } from '../redux/tripSlice';

const PlanDetailScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { trip } = route.params;

    const user = useSelector(selectUser);
    const userTrips = useSelector(selectUserTrips);
    const tripStatus = useSelector(selectTripStatus);
    const isOwner = trip.owner_id === user._id ? true : false;

    const [tripData, setTripData] = useState(trip);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOwner) {
            if (tripStatus === 'loading') {
                setLoading(true);
            } else if (tripStatus === 'error') {
                setLoading(false);
            } else if (tripStatus === 'idle') {
                setLoading(false);
                const currentTrip = userTrips.find((el) => el._id === trip._id);
                setTripData(currentTrip);
            }
        } else {
            setLoading(false);
        }
    }, [tripStatus]);

    const handleGoToEdit = async () => {
        await SheetManager.hide('edit_sheet');
        navigation.navigate('PlanDetailEditScreen', { trip: tripData });
    };

    const renderTabBar = (props) => (
        <ScrollableTabBar
            {...props}
            style={{
                borderBottomWidth: 0,
                height: 45,
                backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
            }}
            tabsContainerStyle={{
                justifyContent: 'flex-start',
            }}
        />
    );

    const renderListHeader = (index) => {
        const firstDate = new Date(tripData.start_date);
        const currentDate = formatDate(firstDate.setDate(firstDate.getDate() + index)).slice(5, 10);

        return (
            <Box style={styles.detailHeader}>
                <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {`Day ${index + 1}`}
                </Text>
                {tripData.start_date && (
                    <Text style={styles.dateText} color={colors.dark[400]}>
                        {currentDate}
                    </Text>
                )}
            </Box>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <Box style={styles.detailContent}>
                <Box style={styles.detailTime}>
                    <Text color={colors.dark[300]}>11:00</Text>
                </Box>
                <Box>
                    <Box style={[styles.detailbox, { borderLeftColor: colors.primary[100] }]}>
                        <Box
                            _dark={{ bg: colors.primary[100] }}
                            _light={{ bg: colors.primary[100] }}
                            style={styles.planIndexBox}
                        >
                            <Text style={styles.planIndex} color={colorMode === 'dark' ? colors.dark[200] : '#fff'}>
                                {index + 1}
                            </Text>
                        </Box>
                        <Text
                            style={styles.planSightName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {item.spot}
                        </Text>
                        <Box style={styles.planBoxNote}>
                            <Box style={styles.planStayTime}>
                                <MaterialCommunityIcons
                                    name="clock-time-four"
                                    size={14}
                                    color={colors.dark[400]}
                                    style={{ marginRight: 4 }}
                                />
                                <Text color={colors.dark[300]}>
                                    {item.stay_time[0]}:{item.stay_time[1]}
                                </Text>
                            </Box>
                            {item.note && (
                                <Text
                                    style={{
                                        marginTop: 12,
                                        width: item.image
                                            ? Dimensions.get('window').width - 168
                                            : Dimensions.get('window').width - 108,
                                    }}
                                    color={colors.dark[300]}
                                >
                                    註：{item.note}
                                </Text>
                            )}
                        </Box>
                    </Box>
                </Box>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.detailImage} resizeMode="cover" />
                ) : (
                    <Box style={styles.detailImage} />
                )}
            </Box>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                {isOwner ? (
                    <PlanDetailHeader navigation={navigation} onPress={() => SheetManager.show('edit_sheet')} />
                ) : (
                    <PlanDetailSaveHeader navigation={navigation} onPress={null} />
                )}
                <Box style={styles.infoWrapper}>
                    {tripData.cover_image ? (
                        <Image source={{ uri: tripData.cover_image }} style={styles.introImage} resizeMode="cover" />
                    ) : (
                        <Box
                            style={styles.introImage}
                            _dark={{ bg: colors.dark[200] }}
                            _light={{ bg: colors.dark[500] }}
                        />
                    )}
                    <Box style={[styles.introBox, { width: Dimensions.get('window').width - 216 }]}>
                        <Text
                            style={styles.introName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {tripData.name}
                        </Text>
                        {tripData.start_date ? (
                            <Text style={styles.introDate} color={colors.dark[300]}>
                                {formatDate(tripData.start_date)}-{formatDate(tripData.end_date)}
                            </Text>
                        ) : (
                            <Text style={styles.introDate} color={colors.dark[300]}>
                                {tripData.duration}天
                            </Text>
                        )}
                        <Box style={styles.groupWrapper}>
                            <Image
                                source={{ uri: tripData.owner_image }}
                                style={styles.ownerAvatar}
                                resizeMode="cover"
                            />
                            {isOwner && (
                                <Pressable
                                    style={[styles.shareBtn, { borderColor: colors.primary[200] }]}
                                    onPress={() => alert('正在開發中...༼ ༎ຶ ෴ ༎ຶ༽')}
                                >
                                    <MaterialIcon name="add" size={14} color={colors.primary[200]} />
                                    <Text style={styles.shareText} color={colors.primary[200]}>
                                        共用
                                    </Text>
                                </Pressable>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ScrollableTabView
                initialPage={0}
                renderTabBar={renderTabBar}
                tabBarUnderlineStyle={{
                    backgroundColor: colors.secondary[200],
                    position: 'absolute',
                    bottom: 0,
                    height: 3,
                }}
                tabBarTextStyle={{ fontSize: 14 }}
                tabBarActiveTextColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                tabBarInactiveTextColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
            >
                {tripData.trips.map((item, index) => {
                    return (
                        <Box style={styles.detailWrapper} tabLabel={`Day ${index + 1}`} key={index}>
                            <FlatList
                                data={item}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                                ListHeaderComponent={() => renderListHeader(index)}
                            />
                        </Box>
                    );
                })}
            </ScrollableTabView>
            <ActionSheet id="edit_sheet">
                <Box style={styles.editSheet} _dark={{ bg: colors.dark[100] }} _light={{ bg: colors.dark[600] }}>
                    <Pressable style={styles.actionBox} onPress={() => handleGoToEdit()}>
                        <Text style={styles.actionText} color={colors.primary[200]}>
                            編輯
                        </Text>
                    </Pressable>
                    <Box style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: colors.dark[500] }}></Box>
                    <Pressable style={styles.actionBox} onPress={() => alert('現在還不能刪掉呦...')}>
                        <Text style={styles.actionText} color={'#DD9193'}>
                            刪除
                        </Text>
                    </Pressable>
                    <Box style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: colors.dark[500] }}></Box>
                    <Pressable style={styles.actionBox} onPress={async () => await SheetManager.hide('edit_sheet')}>
                        <Text style={styles.actionText} color={colors.dark[400]}>
                            取消
                        </Text>
                    </Pressable>
                </Box>
            </ActionSheet>
            {loading && <Loading />}
        </Box>
    );
};

export default PlanDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    introBox: {
        marginLeft: 12,
    },
    introImage: {
        width: 172,
        height: 95,
        borderRadius: 5,
    },
    introName: {
        fontSize: 16,
        fontWeight: '500',
    },
    introDate: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#969696',
    },
    groupWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    shareBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 20,
        marginLeft: 12,
    },
    shareText: {
        fontSize: 11,
    },
    detailWrapper: {
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingBottom: 80,
    },
    detailHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        marginBottom: 10,
    },
    dayText: {
        fontSize: 16,
        fontWeight: '500',
    },
    dateText: {
        fontSize: 11,
        color: '#969696',
        marginLeft: 10,
    },
    detailContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    detailTime: {
        alignItems: 'center',
    },
    detailType: {
        marginTop: 5,
    },
    detailbox: {
        marginLeft: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        borderLeftWidth: 1.5,
    },
    planIndexBox: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left: -11,
    },
    planIndex: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        lineHeight: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
    },
    planSightName: {
        fontSize: 16,
        fontWeight: '500',
    },
    planStayTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 11,
        marginRight: 8,
        marginTop: 3,
    },
    detailImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginLeft: 'auto',
    },
    editSheet: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    actionBox: {
        width: '80%',
        paddingVertical: 18,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 20,
    },
});
