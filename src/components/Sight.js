import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AddButton } from './AddButton';

const Sight = ({ navigation, item }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable style={styles.sightBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
            <Box style={styles.sightImageBox}>
                <Image source={{ uri: item.Picture1 }} style={styles.sightImage} resizeMode="cover" />
            </Box>
            <Box style={styles.sightInfo}>
                <Text style={styles.sightName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {item.Name}
                </Text>
                <Text style={styles.sightLocation} color={colors.dark[300]}>
                    {item.Region}・{item.Town}
                </Text>
                <Rating
                    count={5}
                    type="custom"
                    imageSize={14}
                    ratingColor={colors.secondary[200]}
                    ratingBackgroundColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}
                    tintColor={colorMode === 'dark' ? colors.dark[100] : '#fff'}
                    readonly={true}
                    style={styles.rating}
                />
                <AddButton size={'small'} style={styles.addSightBtn} onPress={null} />
            </Box>
        </Pressable>
    );
};

export { Sight };

const styles = StyleSheet.create({
    sightBox: {
        width: 188,
        height: Platform.OS === 'ios' ? 210 : 220,
        borderRadius: 5,
        marginRight: 10,
    },
    sightImage: {
        width: 188,
        height: 125,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    sightInfo: {
        width: 188,
        height: Platform.OS === 'ios' ? 85 : 95,
        padding: 12,
    },
    sightName: {
        fontSize: 14,
        fontWeight: '500',
    },
    sightLocation: {
        fontSize: 11,
    },
    addSightBtn: {
        position: 'absolute',
        bottom: 12,
        right: 12,
    },
    rating: {
        width: 70,
    },
});
