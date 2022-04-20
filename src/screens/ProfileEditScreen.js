import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Input, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { ProfileEditHeader } from '../components/Header';
import { setProfileInfo } from '../redux/actions/profileActions';

const ProfileEditScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { info } = useSelector((state) => state.profile);

    const [avatar, setAvatar] = useState(info.avatar);
    const [name, setName] = useState(info.name);
    const [interest, setInterest] = useState(info.interest);
    const [type, setType] = useState(info.type);
    const [transportation, setTransportation] = useState(info.transportation);
    const [gender, setGender] = useState(info.gender);
    const [age, setAge] = useState(info.age);

    const dispatch = useDispatch();

    const handleDone = () => {
        dispatch(setProfileInfo({ avatar, name, interest, type, transportation, gender, age }));
        navigation.goBack();
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <ProfileEditHeader navigation={navigation} onPressDone={handleDone} />
            <Pressable style={styles.avatarBox} onPress={null}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
                <Box style={styles.avatarMask}>
                    <MaterialIcon name="camera-alt" size={36} color="#fff" />
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
                    <Input
                        variant="underlined"
                        placeholder="未設定暱稱"
                        size="md"
                        minWidth="85%"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </Box>
                <Box style={styles.contentInputWrapper}>
                    <Text
                        style={styles.labelWrapper}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >
                        興趣
                    </Text>
                    <Input
                        variant="underlined"
                        placeholder="興趣"
                        size="md"
                        minWidth="85%"
                        value={interest}
                        onChangeText={(text) => setInterest(text)}
                    />
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
});
