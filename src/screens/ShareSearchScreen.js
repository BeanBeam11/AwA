import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { SearchBar } from '../components/SearchBar';
import { Post } from '../components/Post';
import { getPostsByCategory, getSearchPostsByTitle } from '../api';

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

    useEffect(() => {
        if (keyword.length > 1) fetchSearchPostsByTitle();
    }, [keyword]);

    const fetchPostsByCategory = async () => {
        setLoading(true);
        const res = await getPostsByCategory({ token, category });
        setPostResult(res.data.data);
        setLoading(false);
    };

    const fetchSearchPostsByTitle = async () => {
        setLoading(true);
        const res = await getSearchPostsByTitle({ token, keyword, limit: 5, skip: 0 });
        setPostResult(res.data.data);
        setLoading(false);
    };

    const renderItem = ({ item }) => {
        return <Post item={item} navigation={navigation} />;
    };

    const renderListEmpty = () => {
        return (
            <Text
                style={{ textAlign: 'center', marginTop: 50 }}
                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
            >
                ( ×ω× ) 尚無搜尋結果
            </Text>
        );
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <Box style={[styles.headerWrapper, { marginTop: 56 }]}>
                <Pressable style={styles.headerLeft} onPress={() => navigation.goBack()}>
                    {colorMode === 'dark' ? (
                        <Image source={require('../../assets/icons/ic_goback_dark.png')} style={styles.headerLeft} />
                    ) : (
                        <Image source={require('../../assets/icons/ic_goback.png')} style={styles.headerLeft} />
                    )}
                </Pressable>
                <SearchBar
                    style={{ width: '100%' }}
                    placeholder={'搜尋文章、評論（上限20字）'}
                    onChangeText={(text) => setKeyword(text)}
                    value={keyword}
                    autoFocus={true}
                />
            </Box>
            <Box style={styles.listWrapper}>
                {loading && <ActivityIndicator color={colors.primary[200]} size="small" style={{ marginBottom: 20 }} />}
                <FlatList
                    data={postResult}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 280 }}
                    // stickyHeaderIndices={[0]}
                    // ListHeaderComponent={renderPostHeader}
                    ListEmptyComponent={renderListEmpty}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                            onRefresh={fetchSearchPostsByTitle}
                        />
                    }
                />
            </Box>
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
