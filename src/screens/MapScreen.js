import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AddButton } from '../components/AddButton';
import { SearchBar } from '../components/SearchBar';

import { useDispatch, useSelector } from 'react-redux';
import { selectRecommendSpots } from '../redux/spotSlice';

const MapScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const recommendSpots = useSelector(selectRecommendSpots);

    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: recommendSpots[0].Position.PositionLat,
        longitude: recommendSpots[0].Position.PositionLon,
        latitudeDelta: 0.003,
        longitudeDelta: 0.002,
    });
    const [marker, setMarker] = useState({
        coord: {
            latitude: recommendSpots[0].Position.PositionLat,
            longitude: recommendSpots[0].Position.PositionLon,
        },
        name: recommendSpots[0].ScenicSpotName,
        address: recommendSpots[0].Address,
    });
    const [spots, setSpots] = useState(recommendSpots);
    const [carouselData, setCarouselData] = useState(recommendSpots);
    const isCarousel = React.useRef(null);

    const renderCarouselItem = ({ item }) => {
        const image = item.Picture.PictureUrl1 ? item.Picture.PictureUrl1 : null;
        const name = item.ScenicSpotName;
        const city = item.City;
        const town = item.Address ? item.Address.replace(/\s/g, '').replace(/[0-9]/g, '').slice(3, 6) : '';

        return (
            <Pressable style={styles.sightBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }} onPress={null}>
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
                        {name.length > 10 ? `${name.slice(0, 10)}...` : name}
                    </Text>
                    <Text style={styles.sightLocation} color={colors.dark[300]}>
                        {city}・{town}
                    </Text>
                    <Rating
                        count={5}
                        startingValue={item.rating}
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

    // const handleSearchResult = (details) => {
    //     setCarouselData([details, ...carouselData]);
    //     setRegion({
    //         ...region,
    //         latitude: details.geometry.location.lat,
    //         longitude: details.geometry.location.lng,
    //     });
    //     setMarker({
    //         coord: {
    //             latitude: details.geometry.location.lat,
    //             longitude: details.geometry.location.lng,
    //         },
    //         name: details.name,
    //         address: details.formatted_address,
    //     });
    // };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <MapView
                style={styles.map}
                region={region}
                mapType="mutedStandard"
                userInterfaceStyle={colorMode === 'dark' ? 'dark' : 'light'}
                showsScale={true}
                showsBuildings={true}
                showsTraffic={true}
                showsIndoors={true}
                loadingEnabled={true}
            >
                <Marker
                    coordinate={marker.coord}
                    title={marker.name}
                    description={marker.address}
                    pinColor={colors.primary[200]}
                />
            </MapView>
            <Box style={styles.searchHeader}>
                <SearchBar
                    placeholder={'搜尋景點'}
                    value={keyword}
                    onChangeText={(text) => setKeyword(text)}
                    onSubmitEditing={() => console.log('search')}
                />
            </Box>
            <Carousel
                ref={isCarousel}
                data={spots}
                containerCustomStyle={styles.carousel}
                renderItem={renderCarouselItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={200}
                onSnapToItem={(index) => {
                    setMarker({
                        coord: {
                            latitude: carouselData[index].Position.PositionLat,
                            longitude: carouselData[index].Position.PositionLon,
                        },
                        name: carouselData[index].ScenicSpotName,
                        address: carouselData[index].Address,
                    });
                    setRegion({
                        ...region,
                        latitude: carouselData[index].Position.PositionLat,
                        longitude: carouselData[index].Position.PositionLon,
                    });
                }}
            />
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
    carousel: {
        position: 'absolute',
        bottom: 100,
    },
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
