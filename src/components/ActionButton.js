import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme, Box, Text} from 'native-base';

const ActionButton = (props) => {
    const {navigation, style, text} = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    
    return (
        <Box
            _dark={{ bg: colors.primary[100]}}
            _light={{ bg: colors.primary[100]}}
            style={[styles.btnWrapper, style]}
        >
            <Text
                style={styles.btnText}
                color={colorMode === 'dark' ? colors.dark[200] : '#fff'}
            >{text}</Text>
        </Box>
    );
}

export { ActionButton };

const styles = StyleSheet.create({
    btnWrapper: {
        width: 120,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 16,
        fontWeight: '500',
    }
});