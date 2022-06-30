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
    ActionSheetIOS,
    Alert,
} from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Radio, Switch } from 'native-base';
import RNModal from 'react-native-modal';
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
import { coverImagesData } from '../data/coverImages';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/accountSlice';
import {
    selectUserTrips,
    selectUserSharedTrips,
    selectCreatedTrip,
    selectTripStatus,
    selectSharedTripStatus,
    selectSavedTripStatus,
    selectCreateTripStatus,
    selectDeleteTripStatus,
    getUserTripsAsync,
    getUserSharedTripsAsync,
    getUserSavedTripsAsync,
    createUserTripAsync,
    updateUserTripInfoAsync,
    deleteUserTripAsync,
    selectUserSavedTrips,
} from '../redux/tripSlice';

const PlannerScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [coverModalVisible, setCoverModalVisible] = useState(false);
    const [coverImage, setCoverImage] = useState(coverImagesData[0].image);
    const [name, setName] = useState('');
    const [isAsigned, setIsAssigned] = useState(true);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(1);
    const [isPublic, setIsPublic] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [tripIndex, setTripIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [trips, setTrips] = useState([]);
    const [sharedTrips, setSharedTrips] = useState([]);
    const [savedTrips, setSavedTrips] = useState([]);
    const [spotImages, setSpotImages] = useState([]);
    const dayArray = [[]];
    const daysStartTimeArray = [''];

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);
    const userSharedTrips = useSelector(selectUserSharedTrips);
    const userSavedTrips = useSelector(selectUserSavedTrips);
    const createdTrip = useSelector(selectCreatedTrip);
    const tripStatus = useSelector(selectTripStatus);
    const sharedTripStatus = useSelector(selectSharedTripStatus);
    const savedTripStatus = useSelector(selectSavedTripStatus);
    const createTripStatus = useSelector(selectCreateTripStatus);
    const deleteTripStatus = useSelector(selectDeleteTripStatus);

    useEffect(() => {
        if (tripStatus == 'error') {
            setLoading(false);
        } else if (tripStatus == 'idle') {
            setTrips(userTrips);
            if (tripStatus) setLoading(false);
        }
    }, [tripStatus]);

    useEffect(() => {
        if (sharedTripStatus == 'error') {
            setLoading(false);
        } else if (sharedTripStatus == 'idle') {
            setSharedTrips(userSharedTrips);
            if (sharedTrips) setLoading(false);
        }
    }, [sharedTripStatus]);

    useEffect(() => {
        if (savedTripStatus == 'error') {
            setLoading(false);
        } else if (savedTripStatus == 'idle') {
            setSavedTrips(userSavedTrips);
            if (savedTrips) setLoading(false);
        }
    }, [savedTripStatus]);

    useEffect(() => {
        if (createTripStatus == 'idle') {
            if (createdTrip) {
                setModalVisible(false);
                navigation.navigate('PlanDetailScreen', { trip: createdTrip });
                navigation.navigate('PlanDetailEditScreen', { trip: createdTrip });
                clearState();
            }
            fetchUserTrips();
        }
    }, [createTripStatus]);

    useEffect(() => {
        if (deleteTripStatus == 'idle') {
            setLoading(false);
            alert('刪除行程成功！');
            fetchUserTrips();
        }
    }, [deleteTripStatus]);

    const fetchUserTrips = () => {
        dispatch(getUserTripsAsync({ token, userId: user._id }));
    };

    const fetchUserSharedTrips = () => {
        dispatch(getUserSharedTripsAsync({ token, userId: user._id }));
    };

    const fetchUserSavedTrips = () => {
        dispatch(getUserSavedTripsAsync({ token, userId: user._id }));
    };

    const showCreateTrip = () => {
        clearState();
        setModalVisible(true);
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
                    is_private: !isPublic,
                    owner_id: user._id,
                    owner_image: user.photo,
                    trips: dayArray,
                    days_start_time: daysStartTimeArray,
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
                    is_private: !isPublic,
                    owner_id: user._id,
                    owner_image: user.photo,
                    trips: dayArray,
                    days_start_time: daysStartTimeArray,
                })
            );
        }
    };

    const handleUpdateTrip = () => {
        const tripId = trips[tripIndex]._id;
        let newData = [...trips[tripIndex].trips];
        let newStartTime = [...trips[tripIndex].days_start_time];
        if (dayArray.length < newData.length) {
            const diff = newData.length - dayArray.length;
            if (isAsigned) {
                if (new Date(endDate).getDate() === new Date(startDate).getDate()) {
                    newData.splice(1, diff);
                    newStartTime.splice(1, diff);
                } else if (diff === 1) {
                    newData.pop();
                    newStartTime.pop();
                } else {
                    for (let i = 0; i < diff + 1; i++) {
                        newData.pop();
                        newStartTime.pop();
                    }
                }
            } else {
                for (let i = 0; i < diff; i++) {
                    newData.pop();
                    newStartTime.pop();
                }
            }
        } else if (dayArray.length > newData.length) {
            const diff = dayArray.length - newData.length;
            for (let i = 0; i < diff; i++) {
                newData.push([]);
                newStartTime.push('');
            }
        }
        if (isAsigned) {
            dispatch(
                updateUserTripInfoAsync({
                    token,
                    tripId,
                    name,
                    cover_image: coverImage,
                    start_date: startDate,
                    end_date: endDate,
                    duration: dayArray.length,
                    is_private: !isPublic,
                    trips: newData,
                    days_start_time: newStartTime,
                })
            );
        } else {
            dispatch(
                updateUserTripInfoAsync({
                    token,
                    tripId,
                    name,
                    cover_image: coverImage,
                    start_date: null,
                    end_date: null,
                    duration,
                    is_private: !isPublic,
                    trips: newData,
                    days_start_time: newStartTime,
                })
            );
        }
        setModalVisible(!modalVisible);
        clearState();
    };

    const clearState = () => {
        setName('');
        setCoverImage(null);
        setSpotImages([]);
        setStartDate(new Date());
        setEndDate(new Date());
        setDuration(1);
        setIsPublic(false);
    };

    const handleNextStep = () => {
        setLoading(true);
        if (name.length < 2) {
            alert('行程名稱須介於2~20字');
            setLoading(false);
            return;
        }
        if (isAsigned) {
            const diff = Date.parse(endDate) - Date.parse(startDate);
            if (diff < 0 && new Date(endDate).getDate() !== new Date(startDate).getDate()) {
                alert('開始日期不可以晚於結束日期呦！');
                setLoading(false);
                return;
            }
            const diffTime = Math.abs(diff);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (new Date(endDate).getDate() !== new Date(startDate).getDate()) {
                for (let i = 0; i < diffDays; i++) {
                    dayArray.push([]);
                    daysStartTimeArray.push('');
                }
            }
        } else {
            for (let i = 0; i < duration - 1; i++) {
                dayArray.push([]);
                daysStartTimeArray.push('');
            }
        }
        if (isEditable) {
            handleUpdateTrip();
        } else {
            handleCreateTrip();
        }
    };

    const showEditSheet = (index) => {
        setTripIndex(index);
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['取消', '編輯', '刪除'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0,
                userInterfaceStyle: colorMode === 'dark' ? 'dark' : 'light',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    handleEditTrip(index);
                } else if (buttonIndex === 2) {
                    checkDeleteTrip(index);
                }
            }
        );
    };

    const handleEditTrip = async (index) => {
        setModalVisible(!modalVisible);
        const currentTrip = trips[index];
        setName(currentTrip.name);
        setCoverImage(currentTrip.cover_image);
        let spotImagesData = currentTrip.trips[0].map((item, index) => {
            return item.image;
        });
        spotImagesData = spotImagesData.filter((el) => el !== '');
        setSpotImages(spotImagesData);
        setIsPublic(!currentTrip.is_private);

        if (currentTrip.start_date) {
            setIsAssigned(true);
            setStartDate(new Date(currentTrip.start_date));
            setEndDate(new Date(currentTrip.end_date));
            setDuration(currentTrip.duration);
        } else {
            setIsAssigned(false);
            setStartDate(new Date());
            setEndDate(new Date());
            setDuration(currentTrip.duration);
        }
    };

    const checkDeleteTrip = (index) => {
        Alert.alert('刪除行程', '確定要刪除行程嗎？ (☍﹏⁰)', [
            {
                text: '我再想想...',
                onPress: null,
                style: 'default',
            },
            {
                text: '刪除！',
                onPress: () => handleDeleteTrip(index),
                style: 'destructive',
            },
        ]);
    };

    const handleDeleteTrip = async (index) => {
        const currentTrip = trips[index];
        dispatch(deleteUserTripAsync({ token, tripId: currentTrip._id }));
        setLoading(true);
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

    const renderCoverImageItem = ({ item }) => {
        return (
            <Pressable style={styles.coverImageBox} onPress={() => setCoverImage(item)}>
                <Image style={styles.avatar} source={{ uri: item }} />
                {item === coverImage && (
                    <Box style={styles.avatarMask}>
                        <MaterialIcon name="check-circle-outline" size={45} color="#fff" />
                    </Box>
                )}
            </Pressable>
        );
    };

    const MyPlanList = () => {
        const renderItem = ({ item, index }) => {
            return (
                <Box>
                    <Plan item={item} navigation={navigation} isEditable={isEditable} />
                    {isEditable && (
                        <Pressable
                            style={[
                                styles.editMask,
                                {
                                    backgroundColor:
                                        colorMode === 'dark' ? 'rgba(41, 41, 41, 0.7)' : 'rgba(72, 72, 72, 0.3)',
                                },
                            ]}
                            onPress={() => showEditSheet(index)}
                        >
                            <Box
                                style={styles.editBtn}
                                _dark={{ bg: colors.primary[100] }}
                                _light={{ bg: colors.primary[200] }}
                            >
                                <MaterialIcon
                                    name="edit"
                                    size={36}
                                    color={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}
                                />
                            </Box>
                        </Pressable>
                    )}
                </Box>
            );
        };

        const renderEmptyComponent = () => {
            return (
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText} color={colors.dark[400]}>{`✧ﾟ･:*(✪ω✪)*:･ﾟ✧`}</Text>
                    <Text style={styles.planNullText} color={colors.dark[400]}>
                        !!! 開始新增行程吧 !!!
                    </Text>
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
                    contentContainerStyle={{ width: 360, paddingLeft: 10, paddingBottom: 280 }}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                            onRefresh={fetchUserTrips}
                        />
                    }
                />
            </Box>
        );
    };

    const SharedPlan = () => {
        const renderItem = ({ item, index }) => {
            return (
                <Box>
                    <Plan item={item} navigation={navigation} />
                </Box>
            );
        };

        const renderEmptyComponent = () => {
            return (
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText} color={colors.dark[400]}>{`(´Ａ｀。)`}</Text>
                    <Text style={styles.planNullText} color={colors.dark[400]}>
                        目前還沒有共用的行程
                    </Text>
                </Box>
            );
        };

        return (
            <Box style={styles.planWrapper}>
                <FlatList
                    data={sharedTrips}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ width: 360, paddingLeft: 10, paddingBottom: 280 }}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                            onRefresh={fetchUserSharedTrips}
                        />
                    }
                />
            </Box>
        );
    };

    const SavedPlan = () => {
        const renderItem = ({ item, index }) => {
            return (
                <Box>
                    <Plan item={item} navigation={navigation} />
                </Box>
            );
        };

        const renderEmptyComponent = () => {
            return (
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText} color={colors.dark[400]}>{`(｡ŏ_ŏ)`}</Text>
                    <Text style={styles.planNullText} color={colors.dark[400]}>
                        目前還沒有收藏行程
                    </Text>
                </Box>
            );
        };

        return (
            <Box style={styles.planWrapper}>
                <FlatList
                    data={savedTrips}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ width: 360, paddingLeft: 10, paddingBottom: 280 }}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                            onRefresh={fetchUserSavedTrips}
                        />
                    }
                />
            </Box>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <PlannerHeader
                title={isEditable ? '編輯行程' : '行程'}
                headerRight={isEditable ? '完成' : '編輯'}
                headerRightStyle={isEditable && { color: colors.primary[200], fontWeight: '500', fontSize: 16 }}
                navigation={navigation}
                onPress={() => (isEditable ? setIsEditable(false) : setIsEditable(true))}
            />
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
            {!isEditable && <AddButton size={'large'} style={styles.fabWrapper} onPress={() => showCreateTrip()} />}
            {modalVisible && (
                <Box
                    style={{
                        backgroundColor: colorMode === 'dark' ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.25)',
                        position: 'absolute',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                ></Box>
            )}
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
                            <Text
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                style={styles.modalHeaderText}
                            >
                                {isEditable ? '編輯行程' : '建立行程'}
                            </Text>
                            <Pressable style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                                <MaterialIcon
                                    name="close"
                                    size={24}
                                    color={colorMode === 'dark' ? '#fff' : '#484848'}
                                />
                            </Pressable>
                        </Box>
                        <Box style={styles.modalContent}>
                            <Box
                                style={styles.imageWrapper}
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.dark[500] }}
                            >
                                <Image source={{ uri: coverImage }} style={styles.image} />
                                <Pressable
                                    style={styles.imageMask}
                                    onPress={() => setCoverModalVisible(!coverModalVisible)}
                                >
                                    <MaterialIcon name="edit" size={60} color={colors.dark[600]} />
                                </Pressable>
                            </Box>
                            <Text style={styles.modalLabel}>行程名稱</Text>
                            <TextInput
                                placeholder="行程名稱（字數須介於2~20）"
                                placeholderTextColor={colors.dark[400]}
                                value={name}
                                onChangeText={(text) => setName(text)}
                                returnKeyType="done"
                                maxLength={20}
                                onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)}
                                style={[
                                    styles.inputWrapper,
                                    {
                                        width: Dimensions.get('window').width - 48,
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                        borderWidth: isFocused ? 1.2 : 1,
                                        borderColor: isFocused ? colors.primary[100] : colors.secondary[200],
                                    },
                                ]}
                            />
                            <Box style={styles.optionWrapper}>
                                <Radio.Group
                                    colorScheme="gray"
                                    name="AsignDate"
                                    value={isAsigned}
                                    onChange={(nextValue) => {
                                        setIsAssigned(nextValue);
                                    }}
                                >
                                    <Radio value={true} size="sm" style={styles.radioOption}>
                                        <Text
                                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                            style={styles.radioText}
                                        >
                                            指定日期
                                        </Text>
                                    </Radio>
                                    <Radio value={false} size="sm" style={styles.radioOption}>
                                        <Text
                                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                            style={styles.radioText}
                                        >
                                            不指定日期
                                        </Text>
                                    </Radio>
                                </Radio.Group>
                                <Box style={{ marginLeft: 50 }}>
                                    <Box style={styles.toggleWrapper}>
                                        <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                            公開
                                        </Text>
                                        <Switch
                                            size="sm"
                                            isChecked={isPublic}
                                            onToggle={() => setIsPublic(!isPublic)}
                                            onTrackColor={colors.primary[100]}
                                        />
                                    </Box>
                                    <Text style={{ fontSize: 11 }} color={colors.dark[300]}>
                                        （任何人皆可查看此行程）
                                    </Text>
                                </Box>
                            </Box>
                            {isAsigned === true ? (
                                <Box>
                                    <Text
                                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                        style={styles.modalLabel}
                                    >
                                        日期
                                    </Text>
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
                                    <Text
                                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                        style={styles.modalLabel}
                                    >
                                        天數
                                    </Text>
                                    <Box style={styles.daysWrapper}>
                                        <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                            預計共
                                        </Text>
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
                                        <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                            天
                                        </Text>
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
                            text={isEditable ? '更新' : '下一步'}
                            style={{ marginTop: 60 }}
                            onPress={() => handleNextStep()}
                            navigation={navigation}
                        />
                        {isEditable && (
                            <Box style={styles.editNote}>
                                <MaterialIcon
                                    name="warning"
                                    size={16}
                                    color={colors.dark[300]}
                                    style={{ marginTop: 2, marginRight: 5 }}
                                />
                                <Text color={colors.dark[300]} style={{ fontSize: 14 }}>
                                    若編輯後的行程天數少於原行程，將從最後一天開始裁減行程內容
                                </Text>
                            </Box>
                        )}
                    </View>
                    <RNModal
                        isVisible={coverModalVisible}
                        style={{ alignItems: 'center' }}
                        onBackdropPress={() => setCoverModalVisible(!coverModalVisible)}
                    >
                        <Box style={styles.coverModalView} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                            <Text
                                style={{ fontSize: 16, fontWeight: '500', paddingBottom: 10 }}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                - 請從第一天的景點中選擇 -
                            </Text>
                            {spotImages.length !== 0 ? (
                                <FlatList
                                    data={spotImages}
                                    renderItem={renderCoverImageItem}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
                                />
                            ) : (
                                <Text style={[styles.planNullText, { marginTop: 50 }]} color={colors.dark[400]}>
                                    沒有可以選擇的圖片QQ
                                </Text>
                            )}
                            <Box style={styles.coverModalActionWrapper}>
                                <Pressable onPress={() => setCoverModalVisible(!coverModalVisible)}>
                                    <Text
                                        style={styles.coverModalActionText}
                                        color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                                    >
                                        取消
                                    </Text>
                                </Pressable>
                                <Pressable onPress={() => setCoverModalVisible(!coverModalVisible)}>
                                    <Text style={styles.coverModalActionText} color={colors.primary[200]}>
                                        完成
                                    </Text>
                                </Pressable>
                            </Box>
                        </Box>
                    </RNModal>
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
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    image: {
        width: 340,
        height: 190,
        borderRadius: 5,
    },
    imageMask: {
        position: 'absolute',
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: 'rgba(72, 72, 72, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 20,
    },
    radioOption: {
        marginTop: 5,
    },
    radioText: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    toggleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 12,
    },
    inputWrapper: {
        height: 36,
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
        alignItems: 'center',
    },
    planNullBox: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planNullText: {
        fontSize: 16,
        marginBottom: 6,
    },
    editMask: {
        width: 165,
        height: 200,
        borderRadius: 5,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editNote: {
        width: 250,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    coverModalView: {
        width: 340,
        height: 410,
        borderRadius: 10,
        paddingVertical: 30,
        alignItems: 'center',
    },
    coverModalActionWrapper: {
        width: 220,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingTop: 10,
    },
    coverModalActionText: {
        fontSize: 16,
        fontWeight: '500',
    },
    coverImageBox: {
        margin: 8,
    },
    avatar: {
        width: 145,
        height: 92,
        borderRadius: 5,
    },
    avatarMask: {
        position: 'absolute',
        width: 145,
        height: 92,
        borderRadius: 5,
        backgroundColor: 'rgba(72, 72, 72, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
