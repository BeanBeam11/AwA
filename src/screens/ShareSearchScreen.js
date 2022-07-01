import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, ScrollView, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { SearchBar } from '../components/SearchBar';
import { Post } from '../components/Post';
import Loading from '../components/Loading';
import { getPostsByCategory } from '../api';
import postData from '../json/post.json';

import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/accountSlice';

const ShareSearchScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { category } = route.params;

    const [keyword, setKeyword] = useState(category ? `#${category}` : '');
    const [postResult, setPostResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = useSelector(selectToken);

    useEffect(() => {
        category && fetchPostsByCategory();
    }, []);

    const fetchPostsByCategory = async () => {
        setLoading(true);
        const res = await getPostsByCategory({ token, category });
        setPostResult(res.data.data);
        setLoading(false);
    };

    const handleSearch = (text) => {
        if (text) {
            const result = postData.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setPostResult(result);
            setKeyword(text);
        } else {
            setPostResult('');
            setKeyword(text);
        }
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <ScrollView>
                <Box style={[styles.headerWrapper, { marginTop: 56 }]}>
                    <Pressable style={styles.headerLeft} onPress={() => navigation.goBack()}>
                        {colorMode === 'dark' ? (
                            <Image
                                source={require('../../assets/icons/ic_goback_dark.png')}
                                style={styles.headerLeft}
                            />
                        ) : (
                            <Image source={require('../../assets/icons/ic_goback.png')} style={styles.headerLeft} />
                        )}
                    </Pressable>
                    <SearchBar
                        style={{ width: '100%' }}
                        placeholder={'搜尋文章、評論（上限20字）'}
                        onChangeText={(text) => handleSearch(text)}
                        value={keyword}
                        autoFocus={true}
                    />
                </Box>
                <Box style={styles.listWrapper}>
                    <Box>
                        {postResult.length !== 0 ? (
                            postResult.map((item, index) => {
                                return <Post item={item} key={index} navigation={navigation} />;
                            })
                        ) : (
                            <Text
                                style={{ textAlign: 'center', marginTop: 50 }}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                ( ×ω× ) 尚無搜尋結果
                            </Text>
                        )}
                    </Box>
                </Box>
            </ScrollView>
            {loading && <Loading />}
        </Box>
    );
};

export default ShareSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        width: '100%',
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        marginTop: 44,
    },
    headerLeft: {
        width: 24,
        height: 24,
    },
    listWrapper: {
        paddingHorizontal: 24,
        marginTop: 20,
    },
});
