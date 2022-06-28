import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, ScrollView, FlatList, Dimensions, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from './ActionButton';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/accountSlice';
import { selectUserTrips, updateUserTripDetailAsync } from '../redux/tripSlice';

const SpotDetailModal = (props) => {
    const { navigation, spot, isVisible, onBackdropPress, onSwipeComplete } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [selectedTripIndex, setSelectedTripIndex] = useState(null);
    const [saved, setSaved] = useState(false);

    const image = spot.Picture.PictureUrl1 ? spot.Picture.PictureUrl1 : null;
    const name = spot.ScenicSpotName;
    const city = spot.City ? spot.City : null;
    const town = spot.Address ? spot.Address.replace(/\s/g, '').replace(/[0-9]/g, '').slice(3, 6) : '';
    const address = spot.Address ? spot.Address.replace(/\s/g, '') : '';
    const open_time = spot.OpenTime ? spot.OpenTime : null;
    const phone = spot.Phone ? spot.Phone : null;
    const description = spot.DescriptionDetail ? spot.DescriptionDetail : null;
    const spotId = spot.ScenicSpotID ? spot.ScenicSpotID : null;
    const latitude = spot.Position ? spot.Position.PositionLat : null;
    const longitude = spot.Position ? spot.Position.PositionLon : null;

    const handleDone = () => {
        if (selectedTrip === null || selectedTripIndex === null) {
            alert('要記得選擇行程及天數呦！');
            return;
        }
        let newData = selectedTrip.trips.map((val, index) => {
            if (index === selectedTripIndex) {
                return [
                    ...val,
                    {
                        spot: name,
                        spot_id: spotId,
                        image: image,
                        stay_time: [0, 0],
                        note: '',
                        location: [latitude, longitude],
                        address: address,
                        open_time: open_time,
                        phone: phone,
                        city: city ? city.slice(0, 2) : null,
                    },
                ];
            } else {
                return val;
            }
        });
        dispatch(
            updateUserTripDetailAsync({
                token,
                tripId: selectedTrip._id,
                trips: newData,
            })
        );
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item }) => {
        return (
            <Pressable
                style={[
                    styles.tripListBox,
                    {
                        borderColor: colors.primary[100],
                        backgroundColor: selectedTrip === item ? colors.primary[100] : null,
                    },
                ]}
                onPress={() => setSelectedTrip(item)}
            >
                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {item.name.length > 12 ? `${item.name.slice(0, 12)}...` : item.name}
                </Text>
            </Pressable>
        );
    };

    const renderDayItem = ({ item, index }) => {
        return (
            <Pressable
                style={[
                    styles.tripDayBox,
                    {
                        borderColor: colors.secondary[200],
                        backgroundColor: selectedTripIndex === index ? colors.secondary[200] : null,
                    },
                ]}
                onPress={() => setSelectedTripIndex(index)}
            >
                <Text
                    style={{ fontSize: 18, fontWeight: '500' }}
                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                >
                    {index + 1}
                </Text>
            </Pressable>
        );
    };

    return (
        <Modal
            isVisible={isVisible}
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onBackdropPress={onBackdropPress}
            onSwipeComplete={onSwipeComplete}
            swipeDirection="down"
            propagateSwipe={true}
            scrollTo={() => {}}
            scrollOffset={1}
        >
            <Box
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 60,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
                _dark={{ bg: colors.dark[100] }}
                _light={{ bg: '#fff' }}
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
                    <Text style={styles.modalHeaderText}>景點資訊</Text>
                    <Pressable style={styles.modalClose} onPress={onBackdropPress}>
                        <MaterialIcon name="close" size={24} color={colorMode === 'dark' ? '#fff' : '#484848'} />
                    </Pressable>
                </Box>
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Box style={styles.imageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                        ) : (
                            <MaterialCommunityIcons
                                name="image-remove"
                                size={50}
                                color={colorMode === 'dark' ? colors.dark[100] : colors.dark[400]}
                            />
                        )}
                    </Box>
                    <Text style={styles.name} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {name}
                    </Text>
                    <Text style={styles.location} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                        {city}・{town}
                    </Text>
                    <Rating
                        count={5}
                        type="custom"
                        imageSize={20}
                        ratingColor={colors.secondary[200]}
                        ratingBackgroundColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}
                        tintColor={colorMode === 'dark' ? colors.dark[100] : '#fff'}
                        readonly={true}
                        style={styles.rating}
                    />
                    <Box style={styles.infoWrapper}>
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={20}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ marginTop: 2 }}
                        />
                        <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                            {address ? address : `尚無資訊`}
                        </Text>
                    </Box>
                    <Box style={styles.infoWrapper}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={18}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ paddingHorizontal: 1, marginTop: 2 }}
                        />
                        <TextInput
                            multiline={true}
                            value={open_time ? open_time : `尚無資訊`}
                            editable={false}
                            style={[styles.info, { color: colorMode === 'dark' ? colors.dark[400] : colors.dark[300] }]}
                        />
                    </Box>
                    <Box style={styles.infoWrapper}>
                        <MaterialCommunityIcons
                            name="phone-outline"
                            size={16}
                            color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                            style={{ paddingHorizontal: 2, marginTop: 3 }}
                        />
                        <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                            {phone ? phone : `尚無資訊`}
                        </Text>
                    </Box>
                    <Box style={styles.actionWrapper}>
                        <Pressable
                            style={[styles.actionBtn, { borderColor: colors.primary[200] }]}
                            onPress={() => setSaved(!saved)}
                        >
                            {saved ? (
                                <MaterialCommunityIcons name="bookmark" size={20} color={colors.primary[200]} />
                            ) : (
                                <MaterialCommunityIcons name="bookmark-outline" size={20} color={colors.primary[200]} />
                            )}
                            <Text style={styles.info} color={colors.primary[200]}>
                                收藏
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.actionBtn, { borderColor: colors.primary[200] }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <MaterialCommunityIcons name="plus" size={20} color={colors.primary[200]} />
                            <Text style={styles.info} color={colors.primary[200]}>
                                行程
                            </Text>
                        </Pressable>
                    </Box>
                    <Text style={styles.description} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {description}
                    </Text>
                </ScrollView>
                <Modal
                    isVisible={modalVisible}
                    style={{ alignItems: 'center' }}
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                >
                    <Box style={styles.modal} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                        <Box>
                            <Text
                                style={styles.modalTitle}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                1. 請選擇想加入的行程
                            </Text>
                            <Box style={{ height: 240, paddingBottom: 15 }}>
                                <FlatList
                                    data={userTrips}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{}}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Text
                                style={styles.modalTitle}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                2. 請選擇想加入第幾天
                            </Text>
                            <Box style={{ width: 240, height: 40, marginBottom: 20 }}>
                                {selectedTrip && (
                                    <FlatList
                                        data={selectedTrip.trips}
                                        renderItem={renderDayItem}
                                        keyExtractor={(item, index) => index}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{}}
                                    />
                                )}
                            </Box>
                        </Box>
                        <ActionButton text={'完成'} onPress={() => handleDone()} />
                    </Box>
                </Modal>
            </Box>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Modal>
    );
};

export { SpotDetailModal };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    modalHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalClose: {
        position: 'absolute',
        right: 16,
    },
    imageBox: {
        width: '100%',
        height: 215,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 215,
        borderRadius: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    location: {
        fontSize: 16,
        marginTop: 8,
    },
    rating: {
        marginRight: 'auto',
        marginVertical: 10,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        paddingRight: 24,
    },
    info: {
        fontSize: 14,
        marginLeft: 3,
    },
    actionWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    actionBtn: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 30,
        marginTop: 5,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        marginTop: 20,
    },
    modal: {
        width: 300,
        height: 460,
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 15,
    },
    tripListBox: {
        width: 240,
        height: 40,
        borderRadius: 5,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tripDayBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
});
