import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Modal, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Checkbox } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DraggableFlatList from 'react-native-draggable-flatlist';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TimePicker } from 'react-native-simple-time-picker';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from '../components/ActionButton';
import { AddButton } from '../components/AddButton';
import { EditHeader } from '../components/Header';
import Loading from '../components/Loading';
import { formatDate, formatTime } from '../utils/formatter';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/accountSlice';
import { updateUserTripDetailAsync, selectUserTrips } from '../redux/tripSlice';

const PlanDetailEditScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [stayTimeModalVisible, setStayTimeModalVisible] = useState(false);
    const [spotName, setSpotName] = useState('');
    const [spotNote, setSpotNote] = useState('');
    const [startTimeRequired, setStartTimeRequired] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [stayTime, setStayTime] = useState({ hours: 0, minutes: 0 });
    const [dayIndex, setDayIndex] = useState(0);
    const [daysStartTime, setDaysStartTime] = useState([]);
    const [loading, setLoading] = useState(false);

    const { trip } = route.params;
    const [tripData, setTripData] = useState(trip);

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);

    const initialData = tripData.trips[0].map((item, index) => {
        return {
            order: index + 1,
            label: item.spot,
            spot_id: item.spot_id,
            image: item.image,
            type: item.type,
            stay_time: item.stay_time,
            note: item.note,
            location: item.location,
            address: item.address,
        };
    });
    const [dragData, setDragData] = useState(initialData);

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };
    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };
    const handleStartTimeConfirm = (time) => {
        setStartTime(time);
        hideStartTimePicker();
    };

    const handleDone = () => {
        dispatch(updateUserTripDetailAsync({ token, tripId: tripData._id, trips: tripData.trips }));
        const currentTrip = userTrips.find((el) => el._id === trip._id);
        navigation.navigate('PlanDetailScreen', { trip: currentTrip });
    };

    useEffect(() => {
        let newDragData = tripData.trips[dayIndex].map((item, index) => {
            return {
                order: index + 1,
                label: item.spot,
                spot_id: item.spot_id,
                image: item.image,
                type: item.type,
                stay_time: item.stay_time,
                note: item.note,
                location: item.location,
                address: item.address,
            };
        });
        setDragData(newDragData);
    }, [tripData]);

    const clearState = () => {
        setSpotName('');
        setSpotNote('');
        setStayTime({ hours: 0, minutes: 0 });
    };

    const handleAddSpot = () => {
        let newData = tripData.trips.map((item, index) => {
            if (index === dayIndex) {
                return [
                    ...item,
                    {
                        spot: spotName,
                        spot_id: '',
                        image: '',
                        stay_time: [stayTime.hours, stayTime.minutes],
                        note: spotNote,
                        location: [],
                        address: '',
                    },
                ];
            } else {
                return item;
            }
        });
        setTripData({
            ...tripData,
            trips: [...newData],
        });
        clearState();
        setModalVisible(!modalVisible);
    };

    const handleOnDragEnd = (data) => {
        setDragData(data);
        let dragEndData = data.map((item, index) => {
            return {
                spot: item.label,
                spot_id: item.spot_id,
                image: item.image,
                stay_time: item.stay_time,
                note: item.note,
                location: item.location,
                address: item.address,
            };
        });
        let newData = tripData.trips.map((item, index) => {
            if (index === dayIndex) {
                return [...dragEndData];
            } else {
                return item;
            }
        });
        setTripData({
            ...tripData,
            trips: [...newData],
        });
    };

    const onChangeTab = (tabIndex) => {
        setDayIndex(tabIndex);
        setDragData(
            tripData.trips[tabIndex].map((item, index) => {
                return {
                    order: index + 1,
                    label: item.spot,
                    spot_id: item.spot_id,
                    image: item.image,
                    type: item.type,
                    stay_time: item.stay_time,
                    note: item.note,
                    location: item.location,
                    address: item.address,
                };
            })
        );
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

    const renderItem = ({ item, index, drag, isActive }) => (
        <Pressable
            style={[styles.planBox, { width: Dimensions.get('window').width - 48 }]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onLongPress={drag}
        >
            <MaterialCommunityIcons
                name="drag-vertical"
                size={24}
                color={colorMode === 'dark' ? colors.dark[200] : colors.dark[500]}
            />
            <Box style={[styles.planBoxDivider, { backgroundColor: colors.secondary[200] }]}></Box>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.planBoxImage} resizeMode="cover" />
            ) : (
                <Box style={styles.planBoxImage} />
            )}
            <Box style={styles.planBoxInfo}>
                <Text style={styles.planSightName}>{item?.label}</Text>
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
                <Box style={{ width: Dimensions.get('window').width - 186 }}>
                    <Text color={colors.dark[300]}>{item.note}</Text>
                </Box>
            </Box>
            <Pressable style={{ marginLeft: 'auto' }} onPress={() => setModalVisible(!modalVisible)}>
                <MaterialIcon name="edit" size={24} color={colors.dark[400]} />
            </Pressable>
        </Pressable>
    );

    const renderListFooter = () => (
        <AddButton size={'medium'} style={styles.addPlanBox} onPress={() => setModalVisible(!modalVisible)} />
    );

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <EditHeader navigation={navigation} title={'編輯行程'} onPressDone={handleDone} />
                <Box style={styles.infoWrapper}>
                    {tripData.cover_image ? (
                        <Image source={{ uri: trip.cover_image }} style={styles.introImage} resizeMode="cover" />
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
                        <Image source={{ uri: tripData.owner_image }} style={styles.ownerAvatar} resizeMode="cover" />
                    </Box>
                </Box>
            </Box>
            <ScrollableTabView
                initialPage={0}
                renderTabBar={renderTabBar}
                onChangeTab={({ i, ref }) => onChangeTab(i)}
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
                    const firstDate = new Date(tripData.start_date);
                    const currentDate = formatDate(firstDate.setDate(firstDate.getDate() + index)).slice(5, 10);

                    return (
                        <Box style={styles.detailWrapper} tabLabel={`Day ${index + 1}`} key={index}>
                            <Box style={styles.detailHeader}>
                                <Text
                                    style={styles.dayText}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    {`Day ${index + 1}`}
                                </Text>
                                {tripData.start_date && (
                                    <Text style={styles.dateText} color={colors.dark[400]}>
                                        {currentDate}
                                    </Text>
                                )}
                            </Box>
                            <DraggableFlatList
                                data={dragData}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                onDragEnd={({ data }) => handleOnDragEnd(data)}
                                ListFooterComponent={renderListFooter}
                            />
                        </Box>
                    );
                })}
            </ScrollableTabView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={[
                        styles.modalView,
                        {
                            backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
                        },
                    ]}
                >
                    <Box
                        style={[
                            styles.modalHeader,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Text style={styles.modalHeaderText}>新增景點</Text>
                        <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcon name="close" size={24} color={colorMode === 'dark' ? '#fff' : '#484848'} />
                        </TouchableOpacity>
                    </Box>
                    <Box style={styles.imageWrapper}>
                        <Image src={null} style={styles.image} />
                    </Box>
                    <Box style={styles.modalContent}>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                行程名稱
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <Text color={colors.dark[300]}>{tripData.name}</Text>
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                景點名稱
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="輸入景點名稱"
                                    placeholderTextColor={colors.dark[400]}
                                    style={{ color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200] }}
                                    value={spotName}
                                    onChangeText={(text) => setSpotName(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                備註(選填)
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="輸入備註"
                                    placeholderTextColor={colors.dark[400]}
                                    style={{ color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200] }}
                                    value={spotNote}
                                    onChangeText={(text) => setSpotNote(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Checkbox
                                value={startTimeRequired}
                                onChange={(value) => setStartTimeRequired(value)}
                                accessibilityLabel="enable time"
                                colorScheme="gray"
                                size="sm"
                                mr={3}
                            />
                            <Box>
                                <Text
                                    style={styles.modalLabel}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    第一個行程開始時間
                                </Text>
                                <Text style={{ fontSize: 11 }} color={colors.dark[300]}>
                                    （顯示各項行程時間點）
                                </Text>
                            </Box>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={() => showStartTimePicker()}
                            >
                                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                    {formatTime(startTime)}
                                </Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                加入天數
                            </Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={null}
                            >
                                <Text style={{ color: '#969696' }}>Day {dayIndex + 1}</Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                停留時間
                            </Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={() => SheetManager.show('stayTime_sheet')}
                            >
                                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                    {stayTime.hours}時{stayTime.minutes}分
                                </Text>
                            </Pressable>
                        </Box>
                    </Box>
                    <ActionButton
                        text={'新增'}
                        style={{ marginTop: Platform.OS === 'ios' ? 60 : 40 }}
                        onPress={() => handleAddSpot()}
                    />
                </View>
                <DateTimePickerModal
                    date={startTime}
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleStartTimeConfirm}
                    onCancel={hideStartTimePicker}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={stayTimeModalVisible}
                    onRequestClose={() => {
                        setStayTimeModalVisible(!stayTimeModalVisible);
                    }}
                ></Modal>
                <ActionSheet id="stayTime_sheet">
                    <Box
                        style={styles.stayTimeSheet}
                        _dark={{ bg: colors.dark[100] }}
                        _light={{ bg: colors.dark[600] }}
                    >
                        <TimePicker
                            hoursUnit="時"
                            minutesUnit="分"
                            value={stayTime}
                            onChange={(value) => setStayTime(value)}
                            textColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        />
                    </Box>
                </ActionSheet>
            </Modal>
            {loading && <Loading />}
        </Box>
    );
};

export default PlanDetailEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 12,
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
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    addDayBtn: {
        width: 36,
        height: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 9,
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
        marginBottom: 20,
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
    planBox: {
        paddingVertical: 12,
        paddingLeft: 6,
        paddingRight: 16,
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    planBoxDivider: {
        width: 3,
        height: 44,
        marginRight: 10,
    },
    planBoxImage: {
        width: 36,
        height: 36,
        borderRadius: 5,
    },
    planBoxInfo: {
        marginLeft: 10,
    },
    addPlanBox: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 200,
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
    },
    modalView: {
        width: '100%',
        height: Platform.OS === 'ios' ? '95%' : '99%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalClose: {
        position: 'absolute',
        right: 0,
    },
    modalContent: {
        marginTop: 10,
    },
    imageWrapper: {
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        marginTop: 10,
    },
    optionRight: {
        width: 250,
        borderBottomWidth: 1,
    },
    optionWrapper: {
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 18,
    },
    optionSelectBox: {
        width: 120,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
    },
    stayTimeSheet: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    timePickerBox: {
        width: '100%',
        height: '45%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 'auto',
    },
    timePickerConfirmBtn: {
        width: '100%',
        height: 50,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    timePickerCancelBtn: {
        width: '100%',
        height: 50,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
