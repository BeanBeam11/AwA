import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Modal,
    View,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    Platform,
    RefreshControl,
} from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Radio } from 'native-base';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AddButton } from '../components/AddButton';
import { ActionButton } from '../components/ActionButton';
import { Plan } from '../components/Plan';
import { PlannerHeader } from '../components/Header';
import Loading from '../components/Loading';
import { formatDate } from '../utils/formatter';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/accountSlice';
import {
    selectUserTrips,
    selectCreatedTrip,
    selectTripStatus,
    selectCreateTripStatus,
    getUserTripsAsync,
    createUserTripAsync,
} from '../redux/tripSlice';

const PlannerScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [isAsigned, setIsAssigned] = useState(true);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(1);

    const [loading, setLoading] = useState(true);
    const [trips, setTrips] = useState([]);
    const dayArray = [[]];

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);
    const createdTrip = useSelector(selectCreatedTrip);
    const tripStatus = useSelector(selectTripStatus);
    const createTripStatus = useSelector(selectCreateTripStatus);

    useEffect(() => {
        fetchUserTrips();
    }, []);

    useEffect(() => {
        if (tripStatus == 'error') {
            setLoading(false);
        } else if (tripStatus == 'idle') {
            setTrips(userTrips);
            if (trips) setLoading(false);
        }
    }, [tripStatus]);

    useEffect(() => {
        if (createTripStatus == 'idle') {
            if (createdTrip) {
                setLoading(false);
                setModalVisible(false);
                navigation.navigate('PlanDetailEditScreen', { trip: createdTrip });
                clearState();
            }
        }
    }, [createTripStatus]);

    const fetchUserTrips = () => {
        dispatch(getUserTripsAsync({ token, userId: user._id }));
    };

    const handleCreateTrip = () => {
        if (isAsigned) {
            dispatch(
                createUserTripAsync({
                    token,
                    name,
                    cover_image: coverImage,
                    start_date: startDate,
                    end_date: endDate,
                    duration: dayArray.length,
                    owner_id: user._id,
                    owner_image: user.photo,
                    trips: dayArray,
                })
            );
        } else {
            dispatch(
                createUserTripAsync({
                    token,
                    name,
                    cover_image: coverImage,
                    start_date: null,
                    end_date: null,
                    duration,
                    owner_id: user._id,
                    owner_image: user.photo,
                    trips: dayArray,
                })
            );
        }
    };

    const clearState = () => {
        setName('');
        setStartDate(new Date());
        setEndDate(new Date());
        setDuration(1);
    };

    const handleNextStep = () => {
        setLoading(true);
        if (name.length < 2) {
            alert('行程名稱須介於2~20字');
            setLoading(false);
            return;
        }
        if (isAsigned) {
            const diff = endDate - startDate;
            if (diff < 0) {
                alert('開始日期不可以晚於結束日期呦！');
                setLoading(false);
                return;
            }
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            for (let i = 0; i < diffDays; i++) {
                dayArray.push([]);
            }
        } else {
            for (let i = 1; i < duration; i++) {
                dayArray.push([]);
            }
        }
        handleCreateTrip();
    };

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleStartConfirm = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };
    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const SegmentedContent = () => {
        if (selectedIndex == 0) {
            return <MyPlanList />;
        } else if (selectedIndex == 1) {
            return <SharedPlan />;
        } else if (selectedIndex == 2) {
            return <SavedPlan />;
        }
    };

    const MyPlanList = () => {
        const renderItem = ({ item }) => {
            return <Plan item={item} navigation={navigation} />;
        };

        const renderEmptyComponent = () => {
            return (
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>{`✧ﾟ･:*(✪ω✪)*:･ﾟ✧`}</Text>
                    <Text style={styles.planNullText}>!!! 開始新增行程吧 !!!</Text>
                </Box>
            );
        };

        return (
            <Box style={styles.planWrapper}>
                <FlatList
                    data={trips}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 280 }}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                            onRefresh={fetchUserTrips}
                        />
                    }
                />
            </Box>
        );
    };

    const SharedPlan = () => {
        return (
            <Box style={styles.planWrapper}>
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無共用行程</Text>
                </Box>
            </Box>
        );
    };

    const SavedPlan = () => {
        return (
            <Box style={styles.planWrapper}>
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無收藏行程</Text>
                </Box>
            </Box>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <PlannerHeader navigation={navigation} onPress={null} />
            <SegmentedControl
                values={['我的行程', '共用行程', '收藏行程']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.segmentedControlStyle}
                fontStyle={{
                    fontSize: 14,
                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[200],
                }}
                activeFontStyle={{
                    fontSize: 14,
                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                }}
                // tintColor={colorMode === "dark" ? colors.secondary[100] : '#fff'}
                // backgroundColor={colorMode === "dark" ? colors.dark[200] : colors.secondary[50]}
                appearance={colorMode === 'dark' ? 'dark' : 'light'}
            />
            <SegmentedContent />
            <AddButton size={'large'} style={styles.fabWrapper} onPress={() => setModalVisible(true)} />
            <View>
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
                                    borderBottomWidth: 1,
                                    borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                                },
                            ]}
                        >
                            <Text style={styles.modalHeaderText}>建立行程</Text>
                            <Pressable style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                                <MaterialIcon
                                    name="close"
                                    size={24}
                                    color={colorMode === 'dark' ? '#fff' : '#484848'}
                                />
                            </Pressable>
                        </Box>
                        <Box style={styles.modalContent}>
                            <Box style={styles.imageWrapper}>
                                <Image source={{ uri: coverImage }} style={styles.image} />
                            </Box>
                            <Text style={styles.modalLabel}>行程名稱</Text>
                            <Box
                                style={[
                                    styles.inputWrapper,
                                    {
                                        width: Dimensions.get('window').width - 48,
                                        borderColor: colors.secondary[200],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="行程名稱（字數須介於2~20）"
                                    placeholderTextColor={colors.dark[400]}
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    returnKeyType="done"
                                    maxLength={20}
                                />
                            </Box>
                            <Radio.Group
                                style={{ marginVertical: 20 }}
                                colorScheme="gray"
                                name="AsignDate"
                                value={isAsigned}
                                onChange={(nextValue) => {
                                    setIsAssigned(nextValue);
                                }}
                            >
                                <Radio value={true} size="sm" style={styles.radioOption}>
                                    <Text style={styles.radioText}>指定日期</Text>
                                </Radio>
                                <Radio value={false} size="sm" style={styles.radioOption}>
                                    <Text style={styles.radioText}>不指定日期</Text>
                                </Radio>
                            </Radio.Group>
                            {isAsigned === true ? (
                                <Box>
                                    <Text style={styles.modalLabel}>日期</Text>
                                    <Box style={styles.dateWrapper}>
                                        <Pressable
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                            style={styles.dateBox}
                                            onPress={showStartDatePicker}
                                        >
                                            <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                                {formatDate(startDate)}
                                            </Text>
                                        </Pressable>
                                        <Box
                                            _dark={{ bg: colors.dark[600] }}
                                            _light={{ bg: colors.dark[200] }}
                                            style={styles.dateDivider}
                                        ></Box>
                                        <Pressable
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                            style={styles.dateBox}
                                            onPress={showEndDatePicker}
                                        >
                                            <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                                {formatDate(endDate)}
                                            </Text>
                                        </Pressable>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Text style={styles.modalLabel}>天數</Text>
                                    <Box style={styles.daysWrapper}>
                                        <Text>預計共</Text>
                                        <Pressable
                                            style={styles.dayBox}
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                        >
                                            <RNPickerSelect
                                                placeholder={{}}
                                                value={duration}
                                                onValueChange={(value) => setDuration(value)}
                                                items={[
                                                    { label: '1', value: 1 },
                                                    { label: '2', value: 2 },
                                                    { label: '3', value: 3 },
                                                    { label: '4', value: 4 },
                                                    { label: '5', value: 5 },
                                                    { label: '6', value: 6 },
                                                    { label: '7', value: 7 },
                                                    { label: '8', value: 8 },
                                                    { label: '9', value: 9 },
                                                    { label: '10', value: 10 },
                                                ]}
                                                style={{
                                                    placeholder: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                                    },
                                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    inputAndroid: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    },
                                                    inputIOS: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    },
                                                    viewContainer: { justifyContent: 'center' },
                                                    inputIOSContainer: { alignItems: 'center' },
                                                }}
                                            />
                                        </Pressable>
                                        <Text>天</Text>
                                    </Box>
                                </Box>
                            )}
                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                date={startDate}
                                onConfirm={handleStartConfirm}
                                onCancel={hideStartDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                date={endDate}
                                onConfirm={handleEndConfirm}
                                onCancel={hideEndDatePicker}
                            />
                        </Box>
                        <ActionButton
                            text={'下一步'}
                            style={{ marginTop: 60 }}
                            onPress={() => handleNextStep()}
                            navigation={navigation}
                        />
                    </View>
                </Modal>
            </View>
            {loading && <Loading />}
        </Box>
    );
};

export default PlannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    segmentedControlStyle: {
        width: '80%',
        height: 32,
        marginTop: 10,
        marginBottom: 25,
    },
    fabWrapper: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
    modalView: {
        width: '100%',
        height: Platform.OS === 'ios' ? '95%' : '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
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
    imageWrapper: {
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    radioOption: {
        marginTop: 5,
    },
    radioText: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 12,
    },
    inputWrapper: {
        height: 36,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBox: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 5,
    },
    dateDivider: {
        width: 16,
        height: 2,
        marginHorizontal: 10,
    },
    daysWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayBox: {
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    planWrapper: {
        width: '100%',
        paddingRight: 12,
        paddingLeft: 22,
    },
    planNullBox: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planNullText: {
        fontSize: 16,
        color: '#969696',
        marginBottom: 6,
    },
});
