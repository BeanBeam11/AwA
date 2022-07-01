import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API } from '@env';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';
import { Sight } from '../components/Sight';
import { SpotDetailModal } from '../components/SpotDetailModal';
import { googlePlaceInitial } from '../data/googlePlaceInitial';

// Google
const MapScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: 24.08594819999999,
        longitude: 120.540171,
        latitudeDelta: 0.003,
        longitudeDelta: 0.002,
    });
    const [marker, setMarker] = useState({
        coord: {
            latitude: 24.08594819999999,
            longitude: 120.540171,
        },
        name: '彰化扇形車庫',
        address: '500台灣彰化縣彰化市彰美路一段1號',
    });
    const [originalData, setOriginalData] = useState(googlePlaceInitial);
    const [carouselData, setCarouselData] = useState(null);
    const isCarousel = React.useRef(null);
    const [spotModalVisible, setSpotModalVisible] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);

    useEffect(() => {
        let newCarouselData = originalData.map((item, index) => {
            const photoUrl = item.photos[0]
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=${GOOGLE_PLACES_API}`
                : null;
            const phoneFormatted = item.international_phone_number
                ? item.international_phone_number.replace('+', '').split(' ').join('-')
                : null;
            const openTimeFormatted = item.opening_hours ? item.opening_hours.weekday_text.join('\n') : null;

            return {
                ScenicSpotID: item.place_id,
                ScenicSpotName: item.name,
                Phone: phoneFormatted,
                Address: item.formatted_address.split('台灣')[1],
                OpenTime: openTimeFormatted,
                Picture: {
                    PictureUrl1: photoUrl,
                },
                Position: {
                    PositionLon: item.geometry.location.lng,
                    PositionLat: item.geometry.location.lat,
                },
                City: item.formatted_address.slice(5, 8),
                Rating: item.rating,
            };
        });
        if (newCarouselData.length > 3) newCarouselData.pop();
        setCarouselData([...newCarouselData]);
    }, [originalData]);

    const renderCarouselItem = ({ item }) => {
        return (
            <Sight
                item={item}
                navigation={navigation}
                onPress={() => {
                    setSpotModalVisible(!spotModalVisible);
                    setSelectedSpot(item);
                }}
            />
        );
    };

    const handleSearchResult = (details) => {
        setOriginalData([details, ...originalData]);
        setRegion({
            ...region,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        });
        setMarker({
            coord: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            },
            name: details.ScenicSpotName,
            address: details.Address,
        });
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <MapView
                style={styles.map}
                provider={null}
                region={region}
                mapType="mutedStandard"
                userInterfaceStyle={colorMode === 'dark' ? 'dark' : 'light'}
                showsScale={false}
                showsBuildings={true}
                showsTraffic={true}
                showsIndoors={true}
                loadingEnabled={true}
                compassOffset={{ x: -10, y: 60 }}
            >
                <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                    pinColor={colors.primary[200]}
                />
            </MapView>
            <Box style={styles.searchBarWrapper} _dark={{ bg: colors.dark[200] }} _light={{ bg: '#fff' }}>
                <Image
                    source={require('../../assets/icons/ic_search.png')}
                    style={styles.searchIcon}
                    resizeMode="cover"
                />
                <GooglePlacesAutocomplete
                    placeholder="搜尋景點"
                    textInputProps={{
                        placeholderTextColor: colors.dark[400],
                        returnKeyType: 'search',
                    }}
                    minLength={2}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        handleSearchResult(details);
                    }}
                    query={{
                        key: GOOGLE_PLACES_API,
                        language: 'zh-TW',
                        components: 'country:TW',
                        types: 'establishment',
                    }}
                    GooglePlacesDetailsQuery={{
                        fields: 'formatted_address,geometry,name,opening_hours,photos,place_id,rating,international_phone_number',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    GooglePlacesSearchQuery={{ rankby: 'distance' }}
                    styles={{
                        textInput: {
                            height: 40,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 24,
                            marginTop: 2,
                            color: colorMode === 'dark' ? '#fff' : colors.dark[200],
                            backgroundColor: colorMode === 'dark' ? colors.dark[200] : '#fff',
                        },
                    }}
                />
            </Box>
            {carouselData && (
                <Carousel
                    ref={isCarousel}
                    data={carouselData}
                    containerCustomStyle={styles.carousel}
                    renderItem={renderCarouselItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={200}
                    onSnapToItem={(index) => {
                        setRegion({
                            ...region,
                            latitude: carouselData[index].Position.PositionLat,
                            longitude: carouselData[index].Position.PositionLon,
                        });
                        setMarker({
                            coord: {
                                latitude: carouselData[index].Position.PositionLat,
                                longitude: carouselData[index].Position.PositionLon,
                            },
                            name: carouselData[index].ScenicSpotName,
                            address: carouselData[index].Address,
                        });
                    }}
                />
            )}
            {selectedSpot && (
                <SpotDetailModal
                    isVisible={spotModalVisible}
                    spot={selectedSpot}
                    onBackdropPress={() => setSpotModalVisible(!spotModalVisible)}
                    onSwipeComplete={() => setSpotModalVisible(false)}
                />
            )}
            {loading && <Loading />}
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
        width: Dimensions.get('window').width - 48,
        position: 'absolute',
        top: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    searchGoogle: {},
    goBackBtn: {
        marginLeft: 20,
    },
    carousel: {
        position: 'absolute',
        bottom: 100,
    },
});
