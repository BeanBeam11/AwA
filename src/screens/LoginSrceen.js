import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { goToSignup, loginAsync, selectStatus } from '../redux/accountSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from '../components/ActionButton';
import Loading from '../components/Loading';

const LoginScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const loginStatus = useSelector(selectStatus);

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            dispatch(loginAsync({ email, password }));
        } else {
            alert('-`д´- 請輸入帳號密碼！');
        }
    };

    const handleGoToSignup = () => {
        dispatch(goToSignup());
    };

    useEffect(() => {
        if (loginStatus == 'error') {
            setLoading(false);
        } else if (loginStatus == 'loading') {
            setLoading(true);
        }
    }, [loginStatus]);

    return (
        <Box
            style={[
                styles.container,
                { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
            ]}
            _dark={{ bg: colors.dark[50] }}
            _light={{ bg: colors.dark[600] }}
        >
            <Text style={styles.title} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                登入
            </Text>
            <Text style={styles.subTitle} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                立即登入來解鎖更多功能！
            </Text>
            <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={colors.dark[300]}
                    style={styles.inputIcon}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={colors.dark[400]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="done"
                    keyboardType="email-address"
                    style={[styles.input, { color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200] }]}
                />
            </Box>
            <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={24}
                    color={colors.dark[300]}
                    style={styles.inputIcon}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={colors.dark[400]}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="done"
                    secureTextEntry={true}
                    style={styles.input}
                />
            </Box>
            <Pressable style={styles.forgotPassword} onPress={() => alert('(´-ι_-｀) 現在還幫不了你')}>
                <Text style={styles.text} color={colors.dark[300]}>
                    忘記密碼
                </Text>
            </Pressable>
            <Box style={styles.dividerWrapper}>
                <Box style={styles.divider} _dark={{ bg: colors.dark[500] }} _light={{ bg: colors.dark[400] }}></Box>
                <Text
                    style={{ marginHorizontal: 15 }}
                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                >
                    或
                </Text>
                <Box style={styles.divider} _dark={{ bg: colors.dark[500] }} _light={{ bg: colors.dark[400] }}></Box>
            </Box>
            <Box style={styles.socialWrapper}>
                <Pressable
                    style={[styles.socialBox, { borderColor: colors.secondary[200] }]}
                    _dark={{ bg: colors.dark[200] }}
                    _light={{ bg: '#fff' }}
                >
                    <MaterialCommunityIcons
                        name="facebook"
                        size={42}
                        color={colors.secondary[200]}
                        style={{ paddingLeft: 1 }}
                    />
                </Pressable>
                <Pressable
                    style={[styles.socialBox, { borderColor: colors.secondary[200] }]}
                    _dark={{ bg: colors.dark[200] }}
                    _light={{ bg: '#fff' }}
                >
                    <MaterialCommunityIcons name="google" size={36} color={colors.secondary[200]} />
                </Pressable>
            </Box>
            <ActionButton text={'登入'} style={{ marginTop: 50 }} onPress={() => handleLogin()} />
            <Box style={styles.instruction}>
                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>還沒有帳號嗎？</Text>
                <Pressable onPress={() => handleGoToSignup()}>
                    <Text style={styles.instructionText} color={colors.primary[200]}>
                        立即註冊
                    </Text>
                </Pressable>
            </Box>
            {loading && <Loading />}
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    title: {
        fontSize: 24,
        lineHeight: 24,
    },
    subTitle: {
        fontSize: 16,
        marginTop: 35,
        marginBottom: 45,
    },
    inputBox: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 5,
    },
    inputIcon: {
        marginHorizontal: 5,
    },
    input: {
        width: '100%',
        fontSize: 16,
    },
    forgotPassword: {
        fontSize: 14,
        marginLeft: 'auto',
    },
    text: {
        fontSize: 14,
    },
    dividerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
    divider: {
        width: 80,
        height: 1,
    },
    socialWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    socialBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 15,
    },
    instruction: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    instructionText: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
