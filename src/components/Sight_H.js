import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddButton } from './AddButton';

const Sight_H = ({ navigation, item, style }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable
            style={[styles.sightBox, style]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={() => navigation.navigate('SightScreen', { spot: item })}
        >
            <Box style={styles.infoWrapper}>
                <Box style={styles.sightImageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.sightImage} resizeMode="cover" />
                    ) : (
                        <MaterialCommunityIcons
                            name="image-remove"
                            size={30}
                            color={colorMode === 'dark' ? colors.dark[100] : colors.dark[400]}
                        />
                    )}
                </Box>
                <Box style={styles.sightInfo}>
                    <Text style={styles.sightName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {item.name.length > 9 ? `${item.name.slice(0, 9)}...` : item.name}
                    </Text>
                    <Text style={styles.sightLocation} color={colors.dark[300]}>
                        {item.city}・{item.town}
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
                </Box>
                <AddButton size={'medium'} style={styles.addSightBtn} onPress={null} />
            </Box>
            {item.description ? (
                <Box style={styles.sightDescription}>
                    <Text color={colors.dark[300]}>{item.description.slice(0, 40)}...</Text>
                </Box>
            ) : null}
        </Pressable>
    );
};

export { Sight_H };

const styles = StyleSheet.create({
    sightBox: {
        width: '100%',
        borderRadius: 5,
        padding: 12,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sightImageBox: {
        width: 100,
        height: 66,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sightImage: {
        width: 100,
        height: 66,
        borderRadius: 5,
    },
    sightInfo: {
        height: 66,
        padding: 3,
        marginLeft: 12,
    },
    sightName: {
        fontSize: 16,
        fontWeight: '500',
    },
    sightLocation: {
        fontSize: 14,
    },
    addSightBtn: {
        marginLeft: 'auto',
    },
    rating: {
        width: 70,
    },
    sightDescription: {
        marginTop: 10,
    },
});
