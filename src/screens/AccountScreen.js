import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Switch} from 'native-base';
import { GoBackHeader } from '../components/Header';

const AccountScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();

    return(
        <Box
            style={styles.container}
            _dark={{ bg: colors.dark[50]}}
            _light={{ bg: colors.dark[600]}}
        >
            <GoBackHeader title={'個人'} navigation={navigation}/>
            <Image source={{uri: "https://pbs.twimg.com/media/Eon8PXAVgAA9QO9?format=jpg&name=large"}} style={styles.avatarBox}/>
            <Text style={styles.name}>Sofia</Text>
            <Box
                style={styles.optionWrapper}
                _dark={{ bg: colors.dark[100]}}
                _light={{ bg: '#fff'}}
            >
                <Pressable style={[styles.optionBox,{
                    borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                }]}>
                    <Image source={require('../../assets/icons/ic_dark_mode.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >深色模式</Text>
                    <Switch
                        size="sm"
                        isChecked={colorMode === "dark"}
                        onToggle={toggleColorMode}
                        onTrackColor={colors.primary[100]}
                    />
                </Pressable>
                <Pressable style={[styles.optionBox,{
                        borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                    }]}
                    onPress={()=> navigation.navigate('ProfileScreen')}
                >
                    <Image source={require('../../assets/icons/ic_edit_profile.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >編輯個人檔案</Text>
                </Pressable>
                <Pressable style={[styles.optionBox,{
                    borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                }]}>
                    <Image source={require('../../assets/icons/ic_setting.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >帳號設定</Text>
                </Pressable>
                <Pressable style={[styles.optionBox,{
                    borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                }]}>
                    <Image source={require('../../assets/icons/ic_review.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >意見回饋</Text>
                </Pressable>
                <Pressable style={[styles.optionBox,{
                    borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                }]}>
                    <Image source={require('../../assets/icons/ic_about.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >關於 AwA</Text>
                </Pressable>
                <Pressable style={[styles.optionBox,{
                    borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                }]}>
                    <Image source={require('../../assets/icons/ic_rate_us.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >評論我們</Text>
                </Pressable>
                <Pressable style={styles.logOutBox}>
                    <Image source={require('../../assets/icons/ic_log_out.png')} style={styles.optionIcon} />
                    <Text
                        style={styles.optionText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >登出</Text>
                </Pressable>
            </Box>
            {/* <Box style={styles.profileWrapper}>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>旅遊類型</Text>
                    </Box>
                    <Text style={styles.text}>美食</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>交通方式</Text>
                    </Box>
                    <Text style={styles.text}>公車</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>性別</Text>
                    </Box>
                    <Text style={styles.text}>女</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>年齡</Text>
                    </Box>
                    <Text style={styles.text}>19-25</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>興趣</Text>
                    </Box>
                    <Text style={styles.text}>吃飯、睡覺、打東東</Text>
                </Box>
            </Box> */}
        </Box>
    );
}

export default AccountScreen;

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
    name: {
        fontSize: 20,
        marginTop: 15,
    },
    optionWrapper: {
        position: 'absolute',
        width: '100%',
        height: 520,
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 24,
        paddingTop: 5,
    },
    optionBox: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginTop: 12,
    },
    optionIcon: {
        width: 24,
        height: 24,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 12,
        marginRight: 'auto',
    },
    logOutBox: {
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
});