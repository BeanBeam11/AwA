import React, { useState } from 'react';
import { StyleSheet, Image, ActionSheetIOS, FlatList } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddButton } from './AddButton';
import { ActionButton } from './ActionButton';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/accountSlice';
import { selectUserTrips, updateUserTripDetailAsync } from '../redux/tripSlice';

const Sight_H = ({ navigation, item, style, onPress }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const userTrips = useSelector(selectUserTrips);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [selectedTripIndex, setSelectedTripIndex] = useState(null);

    const image = item.Picture.PictureUrl1 ? item.Picture.PictureUrl1 : null;
    const name = item.ScenicSpotName;
    const city = item.City;
    const town = item.Address ? item.Address.replace(/\s/g, '').replace(/[0-9]/g, '').slice(3, 6) : '';
    const description = item.DescriptionDetail;
    const address = item.Address ? item.Address.replace(/\s/g, '') : '';
    const spotId = item.ScenicSpotID ? item.ScenicSpotID : null;
    const latitude = item.Position ? item.Position.PositionLat : null;
    const longitude = item.Position ? item.Position.PositionLon : null;

    const showActionSheet = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['取消', '收藏', '加入行程'],
                cancelButtonIndex: 0,
                userInterfaceStyle: colorMode === 'dark' ? 'dark' : 'light',
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    alert('收藏');
                } else if (buttonIndex === 2) {
                    setModalVisible(!modalVisible);
                }
            }
        );

    const handleDone = () => {
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
        <Pressable
            style={[styles.sightBox, style]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={onPress}
        >
            <Box style={styles.infoWrapper}>
                <Box style={styles.sightImageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.sightImage} resizeMode="cover" />
                    ) : (
                        <MaterialCommunityIcons
                            name="image-remove"
                            size={30}
                            color={colorMode === 'dark' ? colors.dark[100] : colors.dark[400]}
                        />
                    )}
                </Box>
                <Box style={styles.sightInfo}>
                    <Text style={styles.sightName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {name.length > 9 ? `${name.slice(0, 9)}...` : name}
                    </Text>
                    <Text style={styles.sightLocation} color={colors.dark[300]}>
                        {city}・{town}
                    </Text>
                    <Rating
                        count={5}
                        type="custom"
                        imageSize={14}
                        ratingColor={colors.secondary[200]}
                        ratingBackgroundColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}
                        tintColor={colorMode === 'dark' ? colors.dark[100] : '#fff'}
                        readonly={true}
                        style={styles.rating}
                    />
                </Box>
                <AddButton size={'medium'} style={styles.addSightBtn} onPress={() => showActionSheet()} />
            </Box>
            {description ? (
                <Box style={styles.sightDescription}>
                    <Text color={colors.dark[300]}>{description.slice(0, 40)}...</Text>
                </Box>
            ) : null}
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
        </Pressable>
    );
};

export { Sight_H };

const styles = StyleSheet.create({
    sightBox: {
        width: '100%',
        borderRadius: 5,
        padding: 12,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sightImageBox: {
        width: 100,
        height: 66,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sightImage: {
        width: 100,
        height: 66,
        borderRadius: 5,
    },
    sightInfo: {
        height: 66,
        padding: 3,
        marginLeft: 12,
    },
    sightName: {
        fontSize: 16,
        fontWeight: '500',
    },
    sightLocation: {
        fontSize: 14,
    },
    addSightBtn: {
        marginLeft: 'auto',
    },
    rating: {
        width: 70,
    },
    sightDescription: {
        marginTop: 10,
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
