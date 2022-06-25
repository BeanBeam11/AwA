import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoBackHeader } from '../components/Header';
import { ActionButton } from '../components/ActionButton';
import Loading from '../components/Loading';
import { selectUser, selectToken, selectStatus, updatePasswordAsync } from '../redux/accountSlice';

const AccountScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();
    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordChangedAt, setPasswordChangedAt] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPassCurrentFocused, setIsPassCurrentFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isPassConfirmFocused, setIsPassConfirmFocused] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const updateStatus = useSelector(selectStatus);
    const { email } = user;

    useEffect(() => {
        if (updateStatus === 'loading') {
            setLoading(true);
        } else if (updateStatus === 'error') {
            setLoading(false);
        } else if (updateStatus === 'idle') {
            setPasswordChangedAt(user.passwordChangedAt);
            if (passwordChangedAt) {
                setLoading(false);
                alert('密碼更新成功(*‘ v`*)');
                clearState();
            }
        }
    }, [updateStatus]);

    const clearState = () => {
        setPasswordCurrent('');
        setPassword('');
        setPasswordConfirm('');
    };

    const updatePassword = () => {
        if (password !== passwordConfirm) {
            setLoading(false);
            alert('新密碼與確認新密碼不一致(≖＿≖)✧');
            return;
        }
        if (password.length < 8) {
            setLoading(false);
            alert('密碼最少要有8個字元(´Ａ｀。)');
            return;
        }
        dispatch(updatePasswordAsync({ token, passwordCurrent, password, passwordConfirm }));
    };

    const inputStyle = {
        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
        backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: colorMode === 'dark' ? colors.dark[50] : colors.dark[600] }}
        >
            <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
                <GoBackHeader title={'帳號設定'} navigation={navigation} />
                <Box style={styles.contentWrapper}>
                    <Box style={styles.optionWrapper}>
                        <Text style={styles.optionTitle}>電子郵件</Text>
                        <Box>
                            <TextInput
                                placeholder={email}
                                placeholderTextColor={colors.dark[300]}
                                editable={false}
                                style={[styles.input, inputStyle]}
                            />
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={24}
                                color={colors.dark[300]}
                                style={styles.inputIcon}
                            />
                        </Box>
                    </Box>
                    <Box style={styles.optionWrapper}>
                        <Text style={styles.optionTitle}>目前密碼</Text>
                        <Box>
                            <TextInput
                                placeholder="Current Password"
                                placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                                value={passwordCurrent}
                                onChangeText={(text) => setPasswordCurrent(text)}
                                returnKeyType="done"
                                secureTextEntry={true}
                                maxLength={30}
                                style={[
                                    styles.input,
                                    inputStyle,
                                    isPassCurrentFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                                ]}
                                onBlur={() => setIsPassCurrentFocused(false)}
                                onFocus={() => setIsPassCurrentFocused(true)}
                            />
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={24}
                                color={colors.dark[300]}
                                style={styles.inputIcon}
                            />
                        </Box>
                    </Box>
                    <Box style={styles.optionWrapper}>
                        <Text style={styles.optionTitle}>新密碼（最少8個字元）</Text>
                        <Box>
                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                returnKeyType="done"
                                secureTextEntry={true}
                                maxLength={30}
                                style={[
                                    styles.input,
                                    inputStyle,
                                    isPassFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                                ]}
                                onBlur={() => setIsPassFocused(false)}
                                onFocus={() => setIsPassFocused(true)}
                            />
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={24}
                                color={colors.dark[300]}
                                style={styles.inputIcon}
                            />
                        </Box>
                    </Box>
                    <Box style={styles.optionWrapper}>
                        <Text style={styles.optionTitle}>確認新密碼</Text>
                        <Box>
                            <TextInput
                                placeholder="Confirm New Password"
                                placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                                value={passwordConfirm}
                                onChangeText={(text) => setPasswordConfirm(text)}
                                returnKeyType="done"
                                secureTextEntry={true}
                                maxLength={30}
                                style={[
                                    styles.input,
                                    inputStyle,
                                    isPassConfirmFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                                ]}
                                onBlur={() => setIsPassConfirmFocused(false)}
                                onFocus={() => setIsPassConfirmFocused(true)}
                            />
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={24}
                                color={colors.dark[300]}
                                style={styles.inputIcon}
                            />
                        </Box>
                    </Box>
                </Box>
                <ActionButton text={'更新'} style={{ marginTop: 80 }} onPress={() => updatePassword()} />
                {loading && <Loading />}
            </Box>
        </KeyboardAwareScrollView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentWrapper: {
        width: '100%',
        paddingHorizontal: 24,
        marginTop: 40,
    },
    optionWrapper: {
        marginBottom: 15,
    },
    optionTitle: {
        marginRight: 'auto',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 12,
        paddingLeft: 40,
        paddingRight: 12,
        fontSize: 16,
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 8,
    },
});
