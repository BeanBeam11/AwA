import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API } from '@env';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AddButton } from '../components/AddButton';

const MapScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
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

    const initialState = [
        {
            formatted_address: '500台灣彰化縣彰化市彰美路一段1號',
            geometry: {
                location: {
                    lat: 24.08594819999999,
                    lng: 120.540171,
                },
                viewport: {
                    northeast: {
                        lat: 24.0873917802915,
                        lng: 120.5415815302915,
                    },
                    southwest: {
                        lat: 24.0846938197085,
                        lng: 120.5388835697085,
                    },
                },
            },
            name: '彰化扇形車庫',
            opening_hours: {
                open_now: false,
                periods: [],
                weekday_text: [
                    '星期一: 休息',
                    '星期二: 13:00 – 16:00',
                    '星期三: 13:00 – 16:00',
                    '星期四: 13:00 – 16:00',
                    '星期五: 13:00 – 16:00',
                    '星期六: 10:00 – 16:00',
                    '星期日: 10:00 – 16:00',
                ],
            },
            photos: [
                {
                    height: 5304,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/113995950153653784645">Chen Dick</a>',
                    ],
                    photo_reference:
                        'Aap_uEDgcJjVG-smKFhOH6N2oMUqRCYAvrvKVo_WYvIT6zJH_kM9LuSQrGT7Yf0GJ6-sWpF-sjC7CDt6_wbz-4ouHCmU7lvqwJlQm0BGChRz2oO4bdJK-es2aCDYbBS0TU1p9fmVk25Sdpqm-ob-Oc9QjuztgnfRYKhBmm9zOFp-MApZ4oS3',
                    width: 7952,
                },
            ],
            place_id: 'ChIJzdeE7Zc4aTQRmhsTYz5Q_kw',
            rating: 4.3,
        },
        {
            formatted_address: '50341台灣彰化縣花壇鄉花壇街273號',
            geometry: {
                location: {
                    lat: 24.0266612,
                    lng: 120.5373037,
                },
                viewport: {
                    northeast: {
                        lat: 24.0280168302915,
                        lng: 120.5387745802915,
                    },
                    southwest: {
                        lat: 24.0253188697085,
                        lng: 120.5360766197085,
                    },
                },
            },
            name: '茉莉花壇夢想館',
            opening_hours: {
                open_now: false,
                periods: [],
                weekday_text: [
                    '星期一: 09:00 – 17:00',
                    '星期二: 09:00 – 17:00',
                    '星期三: 09:00 – 17:00',
                    '星期四: 09:00 – 17:00',
                    '星期五: 09:00 – 17:00',
                    '星期六: 09:00 – 17:00',
                    '星期日: 09:00 – 17:00',
                ],
            },
            photos: [
                {
                    height: 3024,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/112131876555866784406">張瓈文</a>',
                    ],
                    photo_reference:
                        'Aap_uEC2ojQimT5itZaZBkKE9Kup5jyVY4E9v_YEuvd9FoRUyGJSjDxLgbuFRys8JS3cGts_pde-SMcPOwzDxhW91b_gyjZzWgt8qxJJxT2LDClyqS1fl_c5r1QAx_jCPSedTFyHx36mI89pvS58i4C0VtNxFfSFdnAG9UuFNaRDTmaCgDS1',
                    width: 4032,
                },
            ],
            place_id: 'ChIJg3qg5AI4aTQRSXlNLh9HNxk',
            rating: 3.7,
        },
        {
            formatted_address: '505台灣彰化縣鹿港鎮瑤林街9號',
            geometry: {
                location: {
                    lat: 24.0559063,
                    lng: 120.4328957,
                },
                viewport: {
                    northeast: {
                        lat: 24.0572711302915,
                        lng: 120.4342670302915,
                    },
                    southwest: {
                        lat: 24.0545731697085,
                        lng: 120.4315690697085,
                    },
                },
            },
            name: '鹿港老街',
            opening_hours: {
                open_now: false,
                periods: [],
                weekday_text: [
                    '星期一: 00:00 – 06:00, 10:00 – 18:00',
                    '星期二: 10:00 – 18:00',
                    '星期三: 10:00 – 18:00',
                    '星期四: 10:00 – 18:00',
                    '星期五: 10:00 – 18:00',
                    '星期六: 10:00 – 18:00',
                    '星期日: 10:00 – 18:00',
                ],
            },
            photos: [
                {
                    height: 3024,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/106000407157920353508">張芳榮</a>',
                    ],
                    photo_reference:
                        'Aap_uEDcQgRz63bB6_mXEZYBfilcKzjl90yV1i2sO_--3rkiaZdcafGithhTpQqRvfEIsNgYB0lbwll4_GuxrLeYLuXZdCYqo4REp4C4WRIoxPjjpicSd9ay9B4QvJFK903Zfl8BKwU_WCTa-PA4t0IbNycC5F1_3bZsKql6qfPaW21VYJXy',
                    width: 4032,
                },
            ],
            place_id: 'ChIJbZ03BtZFaTQRVSahxk_O324',
            rating: 4.4,
        },
        {
            formatted_address: '505台灣彰化縣鹿港鎮鹿工南四路30號',
            geometry: {
                location: {
                    lat: 24.0684557,
                    lng: 120.3948468,
                },
                viewport: {
                    northeast: {
                        lat: 24.0696038302915,
                        lng: 120.3962023302915,
                    },
                    southwest: {
                        lat: 24.0669058697085,
                        lng: 120.3935043697085,
                    },
                },
            },
            name: '臺灣玻璃館',
            opening_hours: {
                open_now: false,
                periods: [],
                weekday_text: [
                    '星期一: 08:00 – 17:00',
                    '星期二: 08:00 – 17:00',
                    '星期三: 08:00 – 17:00',
                    '星期四: 08:00 – 16:30',
                    '星期五: 08:00 – 17:00',
                    '星期六: 08:00 – 18:00',
                    '星期日: 08:00 – 18:00',
                ],
            },
            photos: [
                {
                    height: 760,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/117678142995300055863">許乃予</a>',
                    ],
                    photo_reference:
                        'Aap_uECkG8eS1zFpEOXbXMlhP-rDIF5sizDR7tZEinq-2tlUHkpI-PgfufPgg52cADd5Pf0UGVmKKzLSzOHgoHBEy_66zS-fitbT8I05Y32jiDuza23wNMCLRY5j_N6NRtZm8L5ZMxYU7BYndkbgERNglS8MY-75l3M1Eui1dbm6ArPGOlI5',
                    width: 1159,
                },
            ],
            place_id: 'ChIJbSGqBZxFaTQRMgOxsNfqnGs',
            rating: 4.1,
        },
        {
            formatted_address: '507台灣彰化縣線西鄉草豐路501巷5號',
            geometry: {
                location: {
                    lat: 24.1260409,
                    lng: 120.4662116,
                },
                viewport: {
                    northeast: {
                        lat: 24.1273973302915,
                        lng: 120.4675286302915,
                    },
                    southwest: {
                        lat: 24.1246993697085,
                        lng: 120.4648306697085,
                    },
                },
            },
            name: '台灣優格餅乾學院 【DIY手作/餅乾/喜餅/彰化美食/親子旅遊/彰化景點】',
            opening_hours: {
                open_now: false,
                periods: [],
                weekday_text: [
                    '星期一: 09:00 – 18:00',
                    '星期二: 09:00 – 18:00',
                    '星期三: 09:00 – 18:00',
                    '星期四: 09:00 – 18:00',
                    '星期五: 09:00 – 18:00',
                    '星期六: 09:00 – 18:00',
                    '星期日: 09:00 – 18:00',
                ],
            },
            photos: [
                {
                    height: 1366,
                    html_attributions: [
                        '<a href="https://maps.google.com/maps/contrib/106373788513238066235">台灣優格餅乾學院 【DIY手作/餅乾/喜餅/彰化美食/親子旅遊/彰化景點】</a>',
                    ],
                    photo_reference:
                        'Aap_uEDzJQ3HOrFYVsSgghyuv64i86gzdiCSxYEp4_KfbUaPR_4exFxDdBIkAZBwUTRmwHPsLn1jFByeS101Cwk_7zgwgHMWwYxJy3ugpTCt6fR-85lW1U76O0hUNve3LNapS1CNWRAvRwyT2vjIbzlm0_lAkpcS7bcEGBEaDr8a564lSpED',
                    width: 2048,
                },
            ],
            place_id: 'ChIJbUfZ5SxBaTQRlP6jUJVdbMc',
            rating: 4.2,
        },
    ];
    const [carouselData, setCarouselData] = useState(initialState);
    const isCarousel = React.useRef(null);

    const renderCarouselItem = ({ item }) => {
        const photoReference = item.photos[0] ? item.photos[0].photo_reference : null;

        return (
            <Pressable style={styles.sightBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }} onPress={null}>
                <Box style={styles.sightImageBox} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[500] }}>
                    {photoReference ? (
                        <Image
                            source={{
                                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API}`,
                            }}
                            style={styles.sightImage}
                            resizeMode="cover"
                        />
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
                        {item.name.length > 10 ? `${item.name.slice(0, 10)}...` : item.name}
                    </Text>
                    <Text style={styles.sightLocation} color={colors.dark[300]}>
                        {item.formatted_address.slice(5, 8)}・{item.formatted_address.slice(8, 11)}
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

    // const getLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    // };

    const handleSearchResult = (details) => {
        setCarouselData([details, ...carouselData]);
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
            name: details.name,
            address: details.formatted_address,
        });
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <MapView style={styles.map} region={region} showsTraffic provider="google">
                <Marker coordinate={marker.coord} title={marker.name} description={marker.address} />
            </MapView>
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
                    minLength={2}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        handleSearchResult(details);
                        console.log(details);
                    }}
                    query={{
                        key: GOOGLE_PLACES_API,
                        language: 'zh-TW',
                        components: 'country:TW',
                        types: 'establishment',
                    }}
                    GooglePlacesDetailsQuery={{
                        fields: 'formatted_address,geometry,name,opening_hours,photos,place_id,rating',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    GooglePlacesSearchQuery={{ rankby: 'distance' }}
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
                            latitude: carouselData[index].geometry.location.lat,
                            longitude: carouselData[index].geometry.location.lng,
                        },
                        name: carouselData[index].name,
                        address: carouselData[index].formatted_address,
                    });
                    setRegion({
                        ...region,
                        latitude: carouselData[index].geometry.location.lat,
                        longitude: carouselData[index].geometry.location.lng,
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
