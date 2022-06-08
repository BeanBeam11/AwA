import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { GoBackHeader } from '../components/Header';
import sightData from '../json/recommendSight';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SightScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { sightName } = route.params;
    const [saved, setSaved] = useState(false);

    const sight = sightData.find((el) => el.Name === sightName);

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'景點資訊'} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
            >
                <Box style={styles.imageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                    {sight.Picture1 ? (
                        <Image source={{ uri: sight.Picture1 }} style={styles.image} resizeMode="cover" />
                    ) : (
                        <MaterialCommunityIcons
                            name="image-remove"
                            size={50}
                            color={colorMode === 'dark' ? colors.dark[100] : colors.dark[400]}
                        />
                    )}
                </Box>
                <Text style={styles.name} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {sight.Name}
                </Text>
                <Text style={styles.location} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                    {sight.Region}・{sight.Town}
                </Text>
                <Rating
                    count={5}
                    type="custom"
                    imageSize={20}
                    ratingColor={colors.secondary[200]}
                    ratingBackgroundColor={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}
                    tintColor={colorMode === 'dark' ? colors.dark[50] : colors.dark[600]}
                    readonly={true}
                    style={styles.rating}
                />
                <Box style={styles.infoWrapper}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={20}
                        color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                    />
                    <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                        {sight.Add ? sight.Add : `尚無資訊`}
                    </Text>
                </Box>
                <Box style={styles.infoWrapper}>
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={18}
                        color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}
                        style={{ paddingHorizontal: 1 }}
                    />
                    <Text style={styles.info} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                        {sight.Opentime ? sight.Opentime : `尚無資訊`}
                    </Text>
                </Box>
                <Box style={styles.actionWrapper}>
                    <Pressable
                        style={[styles.actionBtn, { borderColor: colors.primary[200] }]}
                        onPress={() => setSaved(!saved)}
                    >
                        {saved ? (
                            <MaterialCommunityIcons name="bookmark" size={20} color={colors.primary[200]} />
                        ) : (
                            <MaterialCommunityIcons name="bookmark-outline" size={20} color={colors.primary[200]} />
                        )}
                        <Text style={styles.info} color={colors.primary[200]}>
                            收藏
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.actionBtn, { borderColor: colors.primary[200] }]}
                        onPress={() => alert('敬請期待！')}
                    >
                        <MaterialCommunityIcons name="plus" size={20} color={colors.primary[200]} />
                        <Text style={styles.info} color={colors.primary[200]}>
                            行程
                        </Text>
                    </Pressable>
                </Box>
                <Text style={styles.description} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {sight.Toldescribe}
                </Text>
            </ScrollView>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default SightScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    imageBox: {
        width: '100%',
        height: 215,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 215,
        borderRadius: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    location: {
        fontSize: 16,
        marginTop: 8,
    },
    rating: {
        marginRight: 'auto',
        marginVertical: 10,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingRight: 24,
    },
    info: {
        fontSize: 14,
        marginLeft: 3,
    },
    actionWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    actionBtn: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 30,
        marginTop: 5,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        marginTop: 20,
    },
});
