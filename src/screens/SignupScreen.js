import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { goToLogin, signupAsync, selectStatus } from '../redux/accountSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from '../components/ActionButton';
import Loading from '../components/Loading';

const SignupScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const loginStatus = useSelector(selectStatus);

    const handleSignup = () => {
        dispatch(signupAsync({ name, email, password, passwordConfirm }));
    };

    const handleGoToLogin = () => {
        dispatch(goToLogin());
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
                註冊
            </Text>
            <Text style={styles.subTitle} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                立即加入來開始你的旅程！
            </Text>
            <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <MaterialCommunityIcons name="account" size={24} color={colors.dark[300]} style={styles.inputIcon} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={colors.dark[400]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    returnKeyType="done"
                    style={[styles.input, { color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200] }]}
                />
            </Box>
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
            <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={24}
                    color={colors.dark[300]}
                    style={styles.inputIcon}
                />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.dark[400]}
                    value={passwordConfirm}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    returnKeyType="done"
                    secureTextEntry={true}
                    style={styles.input}
                />
            </Box>
            <ActionButton text={'註冊'} style={{ marginTop: 50 }} onPress={() => handleSignup()} />
            <Box style={styles.instruction}>
                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>已經有帳號了！</Text>
                <Pressable onPress={() => handleGoToLogin()}>
                    <Text style={styles.instructionText} color={colors.primary[200]}>
                        立即登入
                    </Text>
                </Pressable>
            </Box>
            {loading && <Loading />}
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default SignupScreen;

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
