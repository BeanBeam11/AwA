import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddButton } from './AddButton';

const Sight = ({ navigation, item }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const image = item.Picture.PictureUrl1 ? item.Picture.PictureUrl1 : null;
    const name = item.ScenicSpotName;
    const city = item.City;
    const town = item.Address ? item.Address.replace(/\s/g, '').replace(/[0-9]/g, '').slice(3, 6) : '';

    return (
        <Pressable
            style={styles.sightBox}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={() => navigation.navigate('SightScreen', { spot: item })}
        >
            <Box style={styles.sightImageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.sightImage} resizeMode="cover" />
                ) : (
                    <MaterialCommunityIcons
                        name="image-remove"
                        size={45}
                        color={colorMode === 'dark' ? colors.dark[100] : colors.dark[400]}
                    />
                )}
            </Box>
            <Box style={styles.sightInfo}>
                <Text style={styles.sightName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {name.length > 9 ? `${name.slice(0, 9)}...` : name}
                </Text>
                <Text style={styles.sightLocation} color={colors.dark[300]}>
                    {city}・{town}
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
    sightImageBox: {
        width: 188,
        height: 125,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
