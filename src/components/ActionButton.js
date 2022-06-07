import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme, Text, Pressable } from 'native-base';

const ActionButton = (props) => {
    const { navigation, style, text, onPress } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable
            _dark={{ bg: colors.primary[100] }}
            _light={{ bg: colors.primary[100] }}
            style={[styles.btnWrapper, style]}
            onPress={onPress}
        >
            <Text style={styles.btnText} color={colorMode === 'dark' ? colors.dark[200] : '#fff'}>
                {text}
            </Text>
        </Pressable>
    );
};

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
    },
});
