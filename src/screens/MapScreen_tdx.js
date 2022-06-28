import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, FlatList } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';
import { SearchBar } from '../components/SearchBar';
import { Sight } from '../components/Sight';
import { SpotDetailModal } from '../components/SpotDetailModal';
import { searchScenicSpots } from '../api/transportData';

import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectRecommendSpots } from '../redux/spotSlice';

// TDX
const MapScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const recommendSpots = useSelector(selectRecommendSpots);
    const accessToken = useSelector(selectAccessToken);

    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
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
    const [spotModalVisible, setSpotModalVisible] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(spots[0]);

    useEffect(() => {
        getSearchResults();
    }, [keyword]);

    useEffect(() => {
        if (searchResult !== null) {
            let newData = [searchResult, ...carouselData];
            newData.pop();
            setCarouselData([...newData]);
        }
    }, [searchResult]);

    const getSearchResults = async () => {
        const res = await searchScenicSpots({ accessToken, keyword });
        setResults(res);
    };

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

    const renderSearchResult = ({ item }) => {
        return (
            <Pressable
                style={[
                    styles.resultBox,
                    { borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500] },
                ]}
                _dark={{ bg: colors.dark[50] }}
                _light={{ bg: '#fff' }}
                onPress={() => {
                    setSearchResult(item);
                }}
            >
                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>{item.ScenicSpotName}</Text>
            </Pressable>
        );
    };

    const renderListEmpty = () => {
        return (
            <Box
                style={[
                    styles.resultBox,
                    { borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500] },
                ]}
                _dark={{ bg: colors.dark[50] }}
                _light={{ bg: '#fff' }}
            >
                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>沒有符合的結果 ( ×ω× )</Text>
            </Box>
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
            <Box style={styles.searchHeader}>
                <SearchBar placeholder={'搜尋景點'} value={keyword} onChangeText={(text) => setKeyword(text)} />
                <FlatList
                    data={results}
                    renderItem={renderSearchResult}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListEmptyComponent={renderListEmpty}
                />
            </Box>
            <Carousel
                ref={isCarousel}
                data={carouselData}
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
    searchHeader: {
        position: 'absolute',
        top: 60,
        alignItems: 'center',
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
    resultBox: {
        width: Dimensions.get('window').width - 48,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
});
