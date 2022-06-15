import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useColorMode, useTheme, Text } from 'native-base';

const ActionButton = (props) => {
    const { navigation, style, text, onPress } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: colors.primary[100],
                    opacity: pressed ? 0.6 : 1,
                },
                styles.btnWrapper,
                style,
            ]}
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
