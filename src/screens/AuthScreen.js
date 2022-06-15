import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useColorMode, useTheme, Box } from 'native-base';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import LoginScreen from './LoginSrceen';
import SignupScreen from './SignupScreen';
import { selectLogin } from '../redux/accountSlice';
import { getAccessTokenAsync } from '../redux/spotSlice';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const AuthScreen = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const loginPosition = useSharedValue('0%');
    const registerPosition = useSharedValue('100%');
    const login = useSelector(selectLogin);
    const dispatch = useDispatch();

    const loginStyle = useAnimatedStyle(() => {
        return { left: loginPosition.value };
    }, [loginPosition.value]);

    const registerStyle = useAnimatedStyle(() => {
        return { left: registerPosition.value };
    }, [registerPosition.value]);

    useEffect(() => {
        dispatch(getAccessTokenAsync());
    }, []);

    useEffect(() => {
        if (login.hasAccount) {
            loginPosition.value = withTiming('0%', {
                duration: 2000,
                easing: Easing.out(Easing.exp),
            });
            registerPosition.value = withTiming('100%', {
                duration: 1000,
                easing: Easing.out(Easing.exp),
            });
        } else {
            loginPosition.value = withTiming('100%', {
                duration: 1000,
                easing: Easing.out(Easing.exp),
            });
            registerPosition.value = withTiming('0%', {
                duration: 2000,
                easing: Easing.out(Easing.exp),
            });
        }
    }, [login]);

    return (
        <Box style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
            <AnimatedBox w="100%" flex={1} position="absolute" style={loginStyle}>
                <LoginScreen />
            </AnimatedBox>
            <AnimatedBox w="100%" flex={1} position="absolute" style={registerStyle}>
                <SignupScreen />
            </AnimatedBox>
        </Box>
    );
};

export default AuthScreen;
