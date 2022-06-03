import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AddButton = ({ navigation, size, style, onPress }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    switch (size) {
        case 'small':
            return (
                <Pressable style={[styles.smallBtn, style, { backgroundColor: colors.primary[100] }]} onPress={onPress}>
                    <MaterialIcon name="add" size={18} color={colorMode === 'dark' ? colors.dark[200] : '#fff'} />
                </Pressable>
            );
        case 'medium':
            return (
                <Pressable
                    style={[styles.mediumBtn, style, { backgroundColor: colors.primary[100] }]}
                    onPress={onPress}
                >
                    <MaterialIcon name="add" size={21} color={colorMode === 'dark' ? colors.dark[200] : '#fff'} />
                </Pressable>
            );
        case 'large':
            return (
                <Pressable style={[styles.largeBtn, style, { backgroundColor: colors.primary[100] }]} onPress={onPress}>
                    <MaterialIcon name="add" size={36} color={colorMode === 'dark' ? colors.dark[200] : '#fff'} />
                </Pressable>
            );
        default:
            break;
    }
};

export { AddButton };

const styles = StyleSheet.create({
    smallBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediumBtn: {
        width: 30,
        height: 30,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
