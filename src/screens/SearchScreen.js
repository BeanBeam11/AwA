import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { useColorMode, Box, Text, Pressable} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Constants from "expo-constants";
import * as Location from "expo-location";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
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
            {/* <MapView
                style={styles.map}
                region={region}
                // onRegionChangeComplete={onRegionChangeComplete}
                showsTraffic
                provider='google'
            >
                <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                >
                    <View></View>
                </Marker>
            </MapView> */}
            <Box style={styles.searchHeader}>
                <Pressable style={styles.goBackBtn} onPress={null}>
                    <MaterialIcon name="arrow-back-ios" size={24} color={ colorMode === "dark" ? '#fff' : '#484848' }/>
                </Pressable>
                <Box
                    style={styles.searchBar}
                    _dark={{ bg: "#969696"}}
                    _light={{ bg: "#fff"}}
                >
                    <TextInput
                        placeholder='搜尋景點'
                        onChangeText={null}
                        value={null}
                        returnKeyType="search"
                    />
                </Box>
            </Box>
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
    searchHeader: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        top: 60,
    },
    goBackBtn: {
        marginLeft: 20,
    },
    searchBar: {
        width: '75%',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 14,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
});