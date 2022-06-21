import React from 'react';
import { StyleSheet, Image, Platform, Dimensions, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Switch } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleHeader } from '../components/Header';
import { selectUser, signOut } from '../redux/accountSlice';

const AccountScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { photo, name } = user;

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <SimpleHeader title={'個人'} navigation={navigation} />
            <Image source={{ uri: photo }} style={styles.avatarBox} />
            <Text style={styles.name}>{name}</Text>
            <Box
                style={[
                    styles.optionWrapper,
                    {
                        height: Dimensions.get('window').height - 350,
                    },
                ]}
                _dark={{ bg: colors.dark[100] }}
                _light={{ bg: '#fff' }}
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Image source={require('../../assets/icons/ic_dark_mode.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            深色模式
                        </Text>
                        <Switch
                            size="sm"
                            isChecked={colorMode === 'dark'}
                            onToggle={toggleColorMode}
                            onTrackColor={colors.primary[100]}
                        />
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                        onPress={() => navigation.navigate('ProfileScreen')}
                    >
                        <Image source={require('../../assets/icons/ic_edit_profile.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            編輯個人檔案
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Image source={require('../../assets/icons/ic_setting.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            帳號設定
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Image source={require('../../assets/icons/ic_review.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            意見回饋
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Image source={require('../../assets/icons/ic_about.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            關於 AwA
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.optionBox,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Image source={require('../../assets/icons/ic_rate_us.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            評論我們
                        </Text>
                    </Pressable>
                    <Pressable style={styles.logOutBox} onPress={() => dispatch(signOut())}>
                        <Image source={require('../../assets/icons/ic_log_out.png')} style={styles.optionIcon} />
                        <Text
                            style={styles.optionText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            登出
                        </Text>
                    </Pressable>
                </ScrollView>
            </Box>
        </Box>
    );
};

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
        marginTop: Platform.OS === 'ios' ? 45 : 20,
    },
    name: {
        fontSize: 20,
        lineHeight: 24,
        marginTop: 15,
    },
    optionWrapper: {
        position: 'absolute',
        width: '100%',
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
        marginTop: 20,
    },
});
