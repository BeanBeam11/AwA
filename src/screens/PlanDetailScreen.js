import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Dimensions, FlatList, Alert, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import Modal from 'react-native-modal';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlanDetailHeader, PlanDetailSaveHeader } from '../components/Header';
import Loading from '../components/Loading';
import { formatDate, formatTime, formatStayTime } from '../utils/formatter';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../redux/accountSlice';
import {
    selectUserTrips,
    selectTripStatus,
    updateUserTripSharedAsync,
    updateUserTripSavedAsync,
} from '../redux/tripSlice';
import { selectSharedUser, selectUserStatus, setSharedUser, getUserByEmailAsync } from '../redux/userSlice';

const PlanDetailScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { trip } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);
    const tripStatus = useSelector(selectTripStatus);
    const sharedUser = useSelector(selectSharedUser);
    const userStatus = useSelector(selectUserStatus);
    const isOwner = trip.owner._id === user._id ? true : false;

    const [tripData, setTripData] = useState(trip);
    const [loading, setLoading] = useState(true);
    const [dayIndex, setDayIndex] = useState(0);
    const [sharedUserData, setSharedUserData] = useState(null);
    const [spotModalVisible, setSpotModalVisible] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState({});
    const [isSaved, setIsSaved] = useState(trip.saved_by.find((el) => el === user._id) ? true : false);

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
                setSharedUserData(null);
                dispatch(setSharedUser(null));
            }
        } else {
            setLoading(false);
        }
    }, [tripStatus]);

    useEffect(() => {
        if (userStatus === 'error') {
            setLoading(false);
            setSharedUserData(null);
        } else if (userStatus === 'idle') {
            setLoading(false);
            updateSharedUser(sharedUser);
        }
    }, [userStatus]);

    const addSharedUser = () => {
        Alert.prompt(
            '與他人共享',
            '請輸入要分享的使用者 Email',
            [
                {
                    text: '取消',
                    onPress: null,
                    style: 'cancel',
                },
                {
                    text: '新增',
                    onPress: (email) => findUser(email),
                },
            ],
            'plain-text',
            '',
            'email-address'
        );
    };

    const findUser = (email) => {
        if (email === user.email) {
            alert('不能共用給自己呦！');
            return;
        }
        dispatch(getUserByEmailAsync({ token, email }));
        setLoading(true);
    };

    const updateSharedUser = (userData) => {
        if (!userData) return;
        let isExist = tripData.shared_users.filter((item) => item._id === userData._id);
        isExist = isExist.length !== 0 ? true : false;
        if (isExist && tripData.shared_users.length !== 0) {
            alert('此使用者已經在共用名單中啦');
            dispatch(setSharedUser(null));
            setLoading(false);
            return;
        } else {
            let newData = [...tripData.shared_users.map((item) => item._id), userData._id];
            setTripData({
                ...tripData,
                shared_users: [
                    ...tripData.shared_users,
                    { photo: userData.photo, _id: userData._id, name: userData.name },
                ],
            });
            dispatch(updateUserTripSharedAsync({ token, tripId: tripData._id, shared_users: newData }));
        }
    };

    const handleSaveTrip = () => {
        const isSavedBefore = tripData.saved_by.find((el) => el === user._id) ? true : false;
        let newData;

        if (isSavedBefore) {
            newData = tripData.saved_by.filter((el) => el !== user._id);
        } else {
            newData = [...tripData.saved_by, user._id];
        }

        dispatch(updateUserTripSavedAsync({ token, tripId: tripData._id, saved_by: [...newData] }));
        setIsSaved(!isSaved);
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
            <Box style={[styles.detailHeader, { width: Dimensions.get('window').width - 48 }]}>
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
        let detailboxWidth;
        let time = tripData.days_start_time[dayIndex] ? tripData.days_start_time[dayIndex] : null;
        const hasImage = item.image ? true : false;
        const hasStartTime = time ? true : false;

        if (hasImage && hasStartTime) {
            detailboxWidth = Dimensions.get('window').width - 168;
        } else if (hasImage || hasStartTime) {
            detailboxWidth = Dimensions.get('window').width - 108;
        } else if (!hasImage && !hasStartTime) {
            detailboxWidth = Dimensions.get('window').width - 90;
        }

        if (hasStartTime && index !== 0) {
            for (let i = 0; i < index; i++) {
                const hour = tripData.trips[dayIndex][i].stay_time[0];
                const minute = tripData.trips[dayIndex][i].stay_time[1];
                time = new Date(time).getTime() + hour * 60 * 60 * 1000 + minute * 60 * 1000;
            }
        }

        return (
            <Pressable
                style={styles.detailContent}
                onPress={() => {
                    setSpotModalVisible(!spotModalVisible);
                    setSelectedSpot(item);
                }}
            >
                {time && (
                    <Box style={styles.detailTime}>
                        <Text color={colors.dark[300]}>{formatTime(time)}</Text>
                    </Box>
                )}
                <Box
                    style={[
                        styles.detailBox,
                        {
                            borderLeftColor: colors.primary[100],
                            width: detailboxWidth,
                        },
                    ]}
                >
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
                                style={{ marginRight: 4, lineHeight: 16 }}
                            />
                            <Text color={colors.dark[300]} style={{ lineHeight: 16 }}>
                                {formatStayTime(item.stay_time[0], item.stay_time[1])}
                            </Text>
                        </Box>
                        {item.note.length !== 0 && (
                            <Box style={styles.planNote}>
                                <MaterialCommunityIcons
                                    name="clipboard-text"
                                    size={14}
                                    color={colors.dark[400]}
                                    style={{ marginRight: 4, lineHeight: 16 }}
                                />
                                <Text style={{ lineHeight: 16, paddingRight: 18 }} color={colors.dark[300]}>
                                    {item.note}
                                </Text>
                            </Box>
                        )}
                    </Box>
                </Box>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.detailImage} resizeMode="cover" />
                ) : (
                    <Box style={styles.detailImage} />
                )}
            </Pressable>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                {isOwner ? (
                    <PlanDetailHeader
                        navigation={navigation}
                        onPress={() => navigation.navigate('PlanDetailEditScreen', { trip: tripData })}
                    />
                ) : (
                    <PlanDetailSaveHeader navigation={navigation} onPress={() => handleSaveTrip()} isSaved={isSaved} />
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
                                source={{ uri: tripData.owner.photo }}
                                style={styles.ownerAvatar}
                                resizeMode="cover"
                            />
                            <Box style={styles.usersWrapper}>
                                {tripData.shared_users.length !== 0 &&
                                    tripData.shared_users.map((item, index) => {
                                        return (
                                            <Image
                                                source={{ uri: item.photo }}
                                                style={[styles.sharedAvatar, { zIndex: 100 - index }]}
                                                resizeMode="cover"
                                                key={item._id}
                                            />
                                        );
                                    })}
                            </Box>
                            {isOwner && (
                                <Pressable
                                    style={[styles.shareBtn, { borderColor: colors.primary[200] }]}
                                    onPress={() => addSharedUser()}
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
                onChangeTab={({ i, ref }) => setDayIndex(i)}
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
                            {index === dayIndex && (
                                <FlatList
                                    data={item}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                                    ListHeaderComponent={() => renderListHeader(index)}
                                />
                            )}
                        </Box>
                    );
                })}
            </ScrollableTabView>
            <Modal
                isVisible={spotModalVisible}
                style={{ alignItems: 'center' }}
                onBackdropPress={() => setSpotModalVisible(!spotModalVisible)}
            >
                <Box style={styles.modal} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                    <Pressable style={styles.modalHeader} onPress={() => setSpotModalVisible(!spotModalVisible)}>
                        <MaterialIcon
                            name="close"
                            size={24}
                            color={colorMode === 'dark' ? '#fff' : '#484848'}
                            style={styles.modalClose}
                        />
                    </Pressable>
                    {selectedSpot.image && (
                        <Image source={{ uri: selectedSpot.image }} style={styles.modalImage} resizeMode="cover" />
                    )}
                    <Text style={styles.modalName}>{selectedSpot.spot}</Text>
                    <Box style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={20}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ paddingTop: 1 }}
                        />
                        <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                            {selectedSpot.address ? selectedSpot.address : '尚無資訊'}
                        </Text>
                    </Box>
                    <Box style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={18}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ paddingHorizontal: 1, paddingTop: 5 }}
                        />
                        <TextInput
                            multiline={true}
                            value={selectedSpot.open_time ? selectedSpot.open_time : '尚無資訊'}
                            editable={false}
                            style={[styles.info, { color: colorMode === 'dark' ? colors.dark[400] : colors.dark[300] }]}
                        />
                    </Box>
                    <Box style={styles.infoBox}>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={16}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ paddingHorizontal: 2, paddingTop: 3 }}
                        />
                        <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                            {selectedSpot.phone ? selectedSpot.phone : '尚無資訊'}
                        </Text>
                    </Box>
                </Box>
            </Modal>
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
    usersWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 13,
    },
    ownerAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
    },
    sharedAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginLeft: -10,
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
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        marginBottom: 15,
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
        width: 48,
        alignItems: 'flex-start',
    },
    detailType: {
        marginTop: 5,
    },
    detailBox: {
        marginLeft: 10,
        paddingLeft: 20,
        paddingBottom: 36,
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
        marginTop: 4,
    },
    planNote: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
    },
    detailImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginLeft: 'auto',
    },
    modal: {
        width: 300,
        minHeight: 100,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 30,
    },
    modalHeader: {
        width: '100%',
        height: 40,
    },
    modalClose: {
        position: 'absolute',
        top: 8,
        right: -16,
    },
    modalName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
    modalImage: {
        width: 250,
        height: 150,
        borderRadius: 5,
        marginBottom: 12,
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 'auto',
        marginVertical: 2,
    },
    info: {
        width: 228,
        fontSize: 14,
        marginLeft: 3,
    },
});
