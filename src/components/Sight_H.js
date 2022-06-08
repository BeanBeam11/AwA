import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AddButton } from './AddButton';

const Sight_H = ({ navigation, item, style }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable
            style={[styles.sightBox, style]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={() => navigation.navigate('SightScreen', { sightName: item.Name })}
        >
            <Box style={styles.infoWrapper}>
                <Box style={styles.sightImageBox}>
                    <Image
                        source={{ uri: item.Picture1 ? item.Picture1 : null }}
                        style={styles.sightImage}
                        resizeMode="cover"
                    />
                </Box>
                <Box style={styles.sightInfo}>
                    <Text style={styles.sightName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {item.Name.length > 9 ? `${item.Name.slice(0, 9)}...` : item.Name}
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
                </Box>
                <AddButton size={'medium'} style={styles.addSightBtn} onPress={null} />
            </Box>
            {item.Toldescribe ? (
                <Box style={styles.sightDescription}>
                    <Text color={colors.dark[300]}>{item.Toldescribe.slice(0, 40)}...</Text>
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
