import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useColorMode, Box, Text, Input, Select, CheckIcon } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ProfileEditScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
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
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelWrapper}>暱稱</Text>
                    <Input 
                        variant="underlined" placeholder="未設定暱稱" size="md" minWidth="85%"
                        value={name} onChangeText={text => setName(text)}
                    />
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelWrapper}>興趣</Text>
                    <Input
                        variant="underlined" placeholder="興趣" size="md" minWidth="85%"
                        value={interest} onChangeText={text => setInterest(text)}
                    />
                </Box>
                <Box style={[styles.contentWrapper,{ marginTop: 20}]}>
                    <Text style={styles.labelSelectWrapper}>偏好旅遊類型</Text>
                    <Select
                        selectedValue={type} width="120" accessibilityLabel="Choose Service"
                        placeholder="未選擇"
                        _selectedItem={{
                            bg: "teal.600",
                        }}
                        dropdownIcon={
                            <MaterialIcon name="expand-more" size={24} key={Math.random()} style={styles.selectIcon(colorMode)}/>
                        }
                        mt={1}
                        onValueChange={itemValue => setType(itemValue)}
                    >
                        <Select.Item label="景點" value="landmark"/>
                        <Select.Item label="美食" value="food"/>
                        <Select.Item label="購物" value="shopping"/>
                        <Select.Item label="住宿" value="hotel"/>
                    </Select>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>偏好交通方式</Text>
                    <Select
                        selectedValue={transportation} width="120" accessibilityLabel="Choose Service"
                        placeholder="未選擇"
                        _selectedItem={{
                            bg: "teal.600",
                        }}
                        dropdownIcon={
                            <MaterialIcon name="expand-more" size={24} key={Math.random()} style={styles.selectIcon(colorMode)}/>
                        }
                        mt={1}
                        onValueChange={itemValue => setTransportation(itemValue)}
                    >
                        <Select.Item label="步行" value="walk"/>
                        <Select.Item label="機車" value="scooter"/>
                        <Select.Item label="汽車" value="car"/>
                        <Select.Item label="公車" value="bus"/>
                        <Select.Item label="火車" value="train"/>
                        <Select.Item label="捷運" value="metro"/>
                    </Select>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>性別</Text>
                    <Select
                        selectedValue={gender} width="120" accessibilityLabel="Choose Service"
                        placeholder="未選擇"
                        _selectedItem={{
                            bg: "teal.600",
                        }}
                        dropdownIcon={
                            <MaterialIcon name="expand-more" size={24} key={Math.random()} style={styles.selectIcon(colorMode)}/>
                        }
                        mt={1}
                        onValueChange={itemValue => setGender(itemValue)}
                    >
                        <Select.Item label="男" value="male"/>
                        <Select.Item label="女" value="female"/>
                    </Select>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Text style={styles.labelSelectWrapper}>年齡</Text>
                    <Select
                        selectedValue={age} width="120" accessibilityLabel="Choose Service"
                        placeholder="未選擇"
                        _selectedItem={{
                            bg: "teal.600",
                        }}
                        dropdownIcon={
                            <MaterialIcon name="expand-more" size={24} key={Math.random()} style={styles.selectIcon(colorMode)}/>
                        }
                        mt={1}
                        onValueChange={itemValue => setAge(itemValue)}
                    >
                        <Select.Item label="18歲以下" value="0_18"/>
                        <Select.Item label="19-25歲" value="19_25"/>
                        <Select.Item label="26-30歲" value="26_30"/>
                        <Select.Item label="31歲以上" value="31_99"/>
                    </Select>
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
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    labelWrapper: {
        fontSize: 14,
        marginRight: 20,
    },
    labelSelectWrapper: {
        marginRight: 'auto',
    },
    selectIcon: (colorMode) => ({
        color: colorMode === "dark" ? '#fff' : '#484848',
    })
});