import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API } from '@env';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from '../components/SearchBar';

const MapScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState({
        longitude: 121.544637,
        latitude: 25.024624,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02,
    });
    const [marker, setMarker] = useState({
        coord: {
            longitude: 121.544637,
            latitude: 25.024624,
        },
        name: '國立臺北教育大學',
        address: '台北市和平東路二段134號',
    });

    useEffect(() => {
        // getLocation();
    });

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const onRegionChangeComplete = (rgn) => {
        if (Math.abs(rgn.latitude - region.latitude) > 0.0002 || Math.abs(rgn.longitude - region.longitude) > 0.0002) {
            setRegion(rgn);
            setMarker({
                ...marker,
                coord: {
                    longitude: rgn.longitude,
                    latitude: rgn.latitude,
                },
            });
        }
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <Text style={{ fontSize: 18 }} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                ...開發中...
            </Text>
            <Text
                style={{ fontSize: 18, marginTop: 10 }}
                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
            >
                ヾ(⌒(ﾉｼ'ω')ﾉｼ
            </Text>
            {/* <MapView
                style={styles.map}
                region={region}
                // onRegionChangeComplete={onRegionChangeComplete}
                showsTraffic
                provider="google"
            >
                <Marker coordinate={marker.coord} title={marker.name} description={marker.address}>
                    <View></View>
                </Marker>
            </MapView> */}
            <Box
                style={[styles.searchBarWrapper, { width: Dimensions.get('window').width - 48 }]}
                _dark={{ bg: colors.dark[200] }}
                _light={{ bg: '#fff' }}
            >
                <Image
                    source={require('../../assets/icons/ic_search.png')}
                    style={styles.searchIcon}
                    resizeMode="cover"
                />
                <GooglePlacesAutocomplete
                    placeholder="搜尋景點"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: GOOGLE_PLACES_API,
                        language: 'zh_tw',
                    }}
                    styles={{
                        textInput: {
                            height: 40,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 24,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchBarWrapper: {
        position: 'absolute',
        top: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    searchIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 8,
        left: 8,
    },
    searchGoogle: {},
    goBackBtn: {
        marginLeft: 20,
    },
});
