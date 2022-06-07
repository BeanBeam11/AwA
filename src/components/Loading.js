import React, { useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box } from 'native-base';
import LottieView from 'lottie-react-native';

const Loading = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const animation = useRef(null);

    return (
        <Box
            style={[
                styles.container,
                { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
            ]}
        >
            <Box style={styles.containerMask} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}></Box>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 150,
                    height: 150,
                }}
                source={require('../../assets/lottie/tripcan_loading.json')}
            />
        </Box>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerMask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
});
