import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Modal, View, Dimensions, FlatList, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { EditHeader } from '../components/Header';
import Loading from '../components/Loading';

import { setUserInfo, selectToken, selectUser, updateUserAsync } from '../redux/accountSlice';

const ProfileEditScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const [photo, setPhoto] = useState(user.photo);
    const [name, setName] = useState(user.name);
    const [interest, setInterest] = useState(user.profile.interest);
    const [type, setType] = useState(user.profile.type);
    const [transportation, setTransportation] = useState(user.profile.transportation);
    const [gender, setGender] = useState(user.profile.gender);
    const [age, setAge] = useState(user.profile.age);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isInterestFocused, setIsInterestFocused] = useState(false);

    const dispatch = useDispatch();

    const handleDone = () => {
        if (name.length < 1) {
            alert('暱稱不可少於一個字呦！');
            return;
        }
        dispatch(setUserInfo({ photo, name, profile: { interest, type, transportation, gender, age } }));
        dispatch(updateUserAsync({ token, photo, name, profile: { interest, type, transportation, gender, age } }));
        navigation.goBack();
    };

    const chooseAvatar = () => {
        setModalVisible(!modalVisible);
    };

    const avatarData = [
        {
            name: 'avatar_01',
            image: 'https://firebasestorage.googleapis.com/v0/b/trip-can-v1.appspot.com/o/default%2Favatar_01.png?alt=media&token=7f500577-095b-449b-a286-ceccae6a56db',
        },
        {
            name: 'avatar_02',
            image: 'https://firebasestorage.googleapis.com/v0/b/trip-can-v1.appspot.com/o/default%2Favatar_02.png?alt=media&token=8da687d4-4612-4c0c-a7f2-0da95c2c6e58',
        },
        {
            name: 'avatar_03',
            image: 'https://firebasestorage.googleapis.com/v0/b/trip-can-v1.appspot.com/o/default%2Favatar_03.png?alt=media&token=2d52bce8-f26f-426d-ba55-e1d5b26a629b',
        },
        {
            name: 'avatar_04',
            image: 'https://firebasestorage.googleapis.com/v0/b/trip-can-v1.appspot.com/o/default%2Favatar_04.png?alt=media&token=9624b299-9ceb-45b9-96fb-1641ca3fb2d4',
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.defaultAvatarBox} onPress={() => setPhoto(item.image)}>
                <Image style={styles.avatar} source={{ uri: item.image }} />
                {item.image === photo && (
                    <Box style={styles.avatarMask}>
                        <MaterialIcon name="check-circle-outline" size={45} color="#fff" />
                    </Box>
                )}
            </Pressable>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <EditHeader navigation={navigation} title={'編輯個人檔案'} onPressDone={handleDone} />
            <Pressable style={styles.avatarBox} onPress={() => chooseAvatar()}>
                <Image style={styles.avatar} source={{ uri: photo }} />
                <Box style={styles.avatarMask}>
                    <MaterialIcon name="edit" size={36} color="#fff" />
                </Box>
            </Pressable>
            <Box style={styles.profileWrapper}>
                <Box style={styles.contentInputWrapper}>
                    <Text
                        style={styles.labelWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        暱稱
                    </Text>
                    <Box
                        style={{
                            width: Dimensions.get('window').width - 110,
                            borderBottomWidth: isNameFocused ? 1.2 : 1,
                            borderBottomColor: isNameFocused
                                ? colors.primary[100]
                                : colorMode === 'dark'
                                ? colors.dark[300]
                                : colors.dark[500],
                        }}
                    >
                        <TextInput
                            placeholder="暱稱"
                            placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                            style={{
                                fontSize: 14,
                                paddingVertical: 6,
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                            }}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            maxLength={20}
                            onBlur={() => setIsNameFocused(false)}
                            onFocus={() => setIsNameFocused(true)}
                        />
                    </Box>
                </Box>
                <Box style={styles.contentInputWrapper}>
                    <Text
                        style={styles.labelWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        興趣
                    </Text>
                    <Box
                        style={{
                            width: Dimensions.get('window').width - 110,
                            borderBottomWidth: isInterestFocused ? 1.2 : 1,
                            borderBottomColor: isInterestFocused
                                ? colors.primary[100]
                                : colorMode === 'dark'
                                ? colors.dark[300]
                                : colors.dark[500],
                        }}
                    >
                        <TextInput
                            placeholder="興趣"
                            placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                            style={{
                                fontSize: 14,
                                paddingVertical: 6,
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                            }}
                            value={interest}
                            onChangeText={(text) => setInterest(text)}
                            returnKeyType="done"
                            maxLength={20}
                            onBlur={() => setIsInterestFocused(false)}
                            onFocus={() => setIsInterestFocused(true)}
                        />
                    </Box>
                </Box>
                <Box style={[styles.contentWrapper, { marginTop: 20 }]}>
                    <Text
                        style={styles.labelSelectWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        偏好旅遊類型
                    </Text>
                    <Box
                        _dark={{ bg: colors.dark[200] }}
                        _light={{ bg: colors.secondary[50] }}
                        style={styles.optionSelectBox}
                    >
                        <RNPickerSelect
                            placeholder={{
                                label: '未設定',
                                value: null,
                            }}
                            value={type}
                            onValueChange={(value) => setType(value)}
                            items={[
                                { label: '景點', value: '景點' },
                                { label: '美食', value: '美食' },
                                { label: '購物', value: '購物' },
                                { label: '住宿', value: '住宿' },
                            ]}
                            style={{
                                placeholder: {
                                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                },
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                inputAndroid: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                inputIOS: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                viewContainer: { justifyContent: 'center' },
                                inputIOSContainer: { alignItems: 'center' },
                            }}
                        />
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text
                        style={styles.labelSelectWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        偏好交通方式
                    </Text>
                    <Box
                        _dark={{ bg: colors.dark[200] }}
                        _light={{ bg: colors.secondary[50] }}
                        style={styles.optionSelectBox}
                    >
                        <RNPickerSelect
                            placeholder={{
                                label: '未設定',
                                value: null,
                            }}
                            value={transportation}
                            onValueChange={(value) => setTransportation(value)}
                            items={[
                                { label: '步行', value: '步行' },
                                { label: '機車', value: '機車' },
                                { label: '汽車', value: '汽車' },
                                { label: '公車', value: '公車' },
                                { label: '火車', value: '火車' },
                                { label: '捷運', value: '捷運' },
                            ]}
                            style={{
                                placeholder: {
                                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                },
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                inputAndroid: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                inputIOS: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                viewContainer: { justifyContent: 'center' },
                                inputIOSContainer: { alignItems: 'center' },
                            }}
                        />
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text
                        style={styles.labelSelectWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        性別
                    </Text>
                    <Box
                        _dark={{ bg: colors.dark[200] }}
                        _light={{ bg: colors.secondary[50] }}
                        style={styles.optionSelectBox}
                    >
                        <RNPickerSelect
                            placeholder={{
                                label: '未設定',
                                value: null,
                            }}
                            value={gender}
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: '男', value: '男' },
                                { label: '女', value: '女' },
                            ]}
                            style={{
                                placeholder: {
                                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                },
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                inputAndroid: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                inputIOS: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                viewContainer: { justifyContent: 'center' },
                                inputIOSContainer: { alignItems: 'center' },
                            }}
                        />
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text
                        style={styles.labelSelectWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        年齡
                    </Text>
                    <Box
                        _dark={{ bg: colors.dark[200] }}
                        _light={{ bg: colors.secondary[50] }}
                        style={styles.optionSelectBox}
                    >
                        <RNPickerSelect
                            placeholder={{
                                label: '未設定',
                                value: null,
                            }}
                            value={age}
                            onValueChange={(value) => setAge(value)}
                            items={[
                                { label: '18歲以下', value: '18歲以下' },
                                { label: '19-25歲', value: '19-25歲' },
                                { label: '26-30歲', value: '26-30歲' },
                                { label: '31歲以上', value: '31歲以上' },
                            ]}
                            style={{
                                placeholder: {
                                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                },
                                color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                inputAndroid: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                inputIOS: {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                                viewContainer: { justifyContent: 'center' },
                                inputIOSContainer: { alignItems: 'center' },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
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
                        <Text
                            style={{ fontSize: 16, fontWeight: '500' }}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            - 請從下列選項選擇 -
                        </Text>
                        <FlatList
                            data={avatarData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            horizontal={false}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 30 }}
                        />
                        <Box style={styles.modalActionWrapper}>
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <Text
                                    style={styles.modalActionText}
                                    color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                                >
                                    取消
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.modalActionText} color={colors.primary[200]}>
                                    完成
                                </Text>
                            </Pressable>
                        </Box>
                    </View>
                </Modal>
            </View>
            {loading && <Loading />}
        </Box>
    );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    avatarBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        marginTop: 45,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarMask: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(72, 72, 72, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileWrapper: {
        width: '100%',
        marginTop: 50,
        paddingHorizontal: 30,
    },
    contentInputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    labelWrapper: {
        fontSize: 14,
        marginRight: 20,
    },
    labelSelectWrapper: {
        fontSize: 14,
        marginRight: 'auto',
    },
    optionSelectBox: {
        width: Platform.OS === 'ios' ? 120 : 140,
        height: Platform.OS === 'ios' ? 30 : 36,
        paddingLeft: Platform.OS === 'ios' ? 0 : 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: 300,
        height: 395,
        borderRadius: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 25,
        alignItems: 'center',
    },
    modalActionWrapper: {
        width: 220,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    modalActionText: {
        fontSize: 16,
        fontWeight: '500',
    },
    defaultAvatarBox: {
        margin: 8,
    },
});
