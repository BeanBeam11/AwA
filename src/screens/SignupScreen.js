import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Dimensions, Image, Keyboard } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isPassConfirmFocused, setIsPassConfirmFocused] = useState(false);

    const dispatch = useDispatch();
    const loginStatus = useSelector(selectStatus);

    const handleSignup = () => {
        Keyboard.dismiss();
        if (name !== '' && email !== '' && password !== '' && passwordConfirm !== '') {
            dispatch(signupAsync({ name, email, password, passwordConfirm }));
        } else {
            alert('-`д´- 請確認每一個欄位都有填寫呦');
        }
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

    const inputStyle = {
        width: Dimensions.get('window').width - 96,
        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
        backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: colorMode === 'dark' ? colors.dark[50] : colors.dark[600] }}
        >
            <Box
                style={[
                    styles.container,
                    { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
                ]}
                _dark={{ bg: colors.dark[50] }}
                _light={{ bg: colors.dark[600] }}
            >
                <Image source={require('../../assets/logo/logo_auth.png')} style={styles.logo} />
                <Text style={styles.subTitle} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    立即加入 - 享受專屬於你的旅程！
                </Text>
                <Box>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        returnKeyType="done"
                        style={[
                            styles.input,
                            inputStyle,
                            isNameFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                        ]}
                        onBlur={() => setIsNameFocused(false)}
                        onFocus={() => setIsNameFocused(true)}
                    />
                    <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color={colors.dark[300]}
                        style={styles.inputIcon}
                    />
                </Box>
                <Box>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        returnKeyType="done"
                        keyboardType="email-address"
                        style={[
                            styles.input,
                            inputStyle,
                            isEmailFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                        ]}
                        onBlur={() => setIsEmailFocused(false)}
                        onFocus={() => setIsEmailFocused(true)}
                    />
                    <MaterialCommunityIcons
                        name="email-outline"
                        size={24}
                        color={colors.dark[300]}
                        style={styles.inputIcon}
                    />
                </Box>
                <Box>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[400]}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        returnKeyType="done"
                        secureTextEntry={true}
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
                <Box>
                    <TextInput
                        placeholder="Confirm Password"
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
        </KeyboardAwareScrollView>
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
    logo: {
        width: 180,
        height: 100,
    },
    subTitle: {
        fontSize: 16,
        marginTop: 35,
        marginBottom: 45,
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
