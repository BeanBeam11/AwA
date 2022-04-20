import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';

const City = ({ navigation, item }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }} style={styles.cityBox} onPress={null}>
            <Image source={item.image} style={styles.cityImage} resizeMode="cover" />
            <Text style={styles.cityName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                {item.city}
            </Text>
        </Pressable>
    );
};

export { City };

const styles = StyleSheet.create({
    cityBox: {
        width: 90,
        height: 110,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    cityImage: {
        width: 60,
        height: 60,
    },
    cityName: {
        fontSize: 14,
        marginTop: 6,
    },
});
