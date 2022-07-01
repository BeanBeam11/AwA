import React, { useState } from 'react';
import { StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import Modal from 'react-native-modal';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { WebView } from 'react-native-webview';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { newsImagesData } from '../data/newsImages';

const News = (props) => {
    const { navigation, style } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const isCarousel = React.useRef(null);
    const [carouselData, setCarouselData] = useState(newsImagesData);
    const [activeSlide, setActiveSlide] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedInfoUrl, setSelectedInfoUrl] = useState(null);

    const renderItem = ({ item }) => {
        return (
            <Pressable
                style={[styles.newsBox, style]}
                _dark={{ bg: colors.dark[100] }}
                _light={{ bg: '#fff' }}
                onPress={() => {
                    setSelectedInfoUrl(item.info_url);
                    setModalVisible(!modalVisible);
                    setLoading(true);
                }}
            >
                <Image source={{ uri: item.image }} style={styles.newsImage} resizeMode="cover" />
            </Pressable>
        );
    };

    return (
        <Box>
            <Carousel
                ref={isCarousel}
                data={carouselData}
                containerCustomStyle={styles.carousel}
                renderItem={renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onBeforeSnapToItem={(index) => setActiveSlide(index)}
                loop={true}
                autoplay={true}
                autoplayInterval={5000}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
            />
            <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={activeSlide}
                containerStyle={{ paddingTop: 20 }}
                dotStyle={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    marginHorizontal: 1,
                    backgroundColor: colors.primary[200],
                }}
                inactiveDotStyle={{
                    backgroundColor: colors.dark[400],
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <Modal
                isVisible={modalVisible}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                propagateSwipe={true}
                scrollTo={() => {}}
                scrollOffset={1}
            >
                <Box
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height - 60,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                    _dark={{ bg: colors.dark[100] }}
                    _light={{ bg: '#fff' }}
                >
                    <Box
                        style={[
                            styles.modalHeader,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Text style={styles.modalHeaderText}>旅遊活動資訊</Text>
                        <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
                            <MaterialIcon name="close" size={24} color={colorMode === 'dark' ? '#fff' : '#484848'} />
                        </Pressable>
                    </Box>
                    {loading && (
                        <ActivityIndicator color={colors.primary[200]} size="large" style={styles.loadingIndicator} />
                    )}
                    <WebView
                        style={{ flex: 1, backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff' }}
                        originWhitelist={['*']}
                        source={{ uri: selectedInfoUrl }}
                        onLoad={() => setLoading(false)}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export { News };

const styles = StyleSheet.create({
    newsBox: {
        width: Dimensions.get('window').width - 48,
        height: 180,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newsImage: {
        width: Dimensions.get('window').width - 48,
        height: 180,
        borderRadius: 5,
    },
    modalHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 10,
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalClose: {
        position: 'absolute',
        right: 16,
    },
    loadingIndicator: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
});
