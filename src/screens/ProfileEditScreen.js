import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useColorMode, Box, Text, Input } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

const ProfileEditScreen = () => {
    const { colorMode } = useColorMode();
    const [ name, setName] =  useState('');
    const [ interest, setInterest] =  useState('');
    const [ type, setType] =  useState('');
    const [ transportation, setTransportation] =  useState('');
    const [ gender, setGender] =  useState('');
    const [ age, setAge] =  useState('');
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <TouchableOpacity style={styles.avatarBox}>
                <Image src={null} />
            </TouchableOpacity>
            <Box style={styles.profileWrapper}>
                <Box style={styles.contentInputWrapper}>
                    <Text style={styles.labelWrapper}>暱稱</Text>
                    <Input 
                        variant="underlined" placeholder="未設定暱稱" size="md" minWidth="85%"
                        value={name} onChangeText={text => setName(text)}
                    />
                </Box>
                <Box style={styles.contentInputWrapper}>
                    <Text style={styles.labelWrapper}>興趣</Text>
                    <Input
                        variant="underlined" placeholder="興趣" size="md" minWidth="85%"
                        value={interest} onChangeText={text => setInterest(text)}
                    />
                </Box>
                <Box style={[styles.contentWrapper,{ marginTop: 20}]}>
                    <Text style={styles.labelSelectWrapper}>偏好旅遊類型</Text>
                    <Box
                        _dark={{ bg: "#C4C4C4"}}
                        _light={{ bg: "#E5E5E5"}}
                        style={styles.optionSelectBox}
                    >
                        <Box>
                            <RNPickerSelect
                                placeholder={{
                                    label: '未設定',
                                    value: null,
                                }}
                                onValueChange={(value) => setType(value)}
                                items={[
                                    { label: '景點', value: 'landmark' },
                                    { label: '美食', value: 'food' },
                                    { label: '購物', value: 'shopping' },
                                    { label: '住宿', value: 'hotel' },
                                ]}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>偏好交通方式</Text>
                    <Box
                        _dark={{ bg: "#C4C4C4"}}
                        _light={{ bg: "#E5E5E5"}}
                        style={styles.optionSelectBox}
                    >
                        <Box>
                            <RNPickerSelect
                                placeholder={{
                                    label: '未設定',
                                    value: null
                                }}
                                onValueChange={(value) => setTransportation(value)}
                                items={[
                                    { label: '步行', value: 'walk' },
                                    { label: '機車', value: 'scooter' },
                                    { label: '汽車', value: 'car' },
                                    { label: '公車', value: 'bus' },
                                    { label: '火車', value: 'train' },
                                    { label: '捷運', value: 'metro' },
                                ]}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>性別</Text>
                    <Box
                        _dark={{ bg: "#C4C4C4"}}
                        _light={{ bg: "#E5E5E5"}}
                        style={styles.optionSelectBox}
                    >
                        <Box>
                            <RNPickerSelect
                                placeholder={{
                                    label: '未設定',
                                    value: null
                                }}
                                onValueChange={(value) => setGender(value)}
                                items={[
                                    { label: '男', value: 'male' },
                                    { label: '女', value: 'female' },
                                ]}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>年齡</Text>
                    <Box
                        _dark={{ bg: "#C4C4C4"}}
                        _light={{ bg: "#E5E5E5"}}
                        style={styles.optionSelectBox}
                    >
                        <Box>
                            <RNPickerSelect
                                placeholder={{
                                    label: '未設定',
                                    value: null
                                }}
                                onValueChange={(value) => setAge(value)}
                                items={[
                                    { label: '18歲以下', value: '0_18' },
                                    { label: '19-25歲', value: '19_25' },
                                    { label: '26-30歲', value: '26_30' },
                                    { label: '31歲以上', value: '31_99' },
                                ]}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

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
    selectIcon: (colorMode) => ({
        color: colorMode === "dark" ? '#fff' : '#484848',
    }),
    optionSelectBox: {
        width: 120,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});