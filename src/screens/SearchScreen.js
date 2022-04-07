import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { useColorMode, Box, Text} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Constants from "expo-constants";
import * as Location from "expo-location";

const SearchScreen = () => {
    const [ location, setLocation ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ region, setRegion ] = useState({
        longitude: 121.544637,
        latitude: 25.024624,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02,
    });
    const [ marker, setMarker ] = useState({
        coord: {
          longitude: 121.544637,
          latitude: 25.024624,
        },
        name: "國立臺北教育大學",
        address: "台北市和平東路二段134號",
    });

    useEffect(() => {
        getLocation();
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
        if(
            Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
            Math.abs(rgn.longitude - region.longitude) > 0.0002
        ){
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

    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={onRegionChangeComplete}
                showsTraffic
                provider='google'
            >
                <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                >
                    {/* <View></View> */}
                </Marker>
            </MapView>
        </Box>
    );
}

export default SearchScreen;

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
});