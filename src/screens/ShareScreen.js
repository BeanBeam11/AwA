import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, RefreshControl } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from '../components/SearchBar';
import { Post } from '../components/Post';
import { AddPostButton } from '../components/AddButton';
import { categories } from '../data/categories';
import { getAllPosts } from '../api';
import Loading from '../components/Loading';
import postData from '../json/post.json';

const ShareScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await getAllPosts();
        setPosts(res.data.data);
        setLoading(false);
    };

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable
                _dark={{ bg: colors.dark[100] }}
                _light={{ bg: '#fff' }}
                style={styles.categoryBox}
                onPress={() => navigation.navigate('ShareSearchScreen', { category: item.name })}
            >
                <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
                <Text style={styles.categoryName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {item.name}
                </Text>
            </Pressable>
        );
    };

    const renderPostItem = ({ item }) => {
        return <Post item={item} navigation={navigation} />;
    };

    const renderPostHeader = () => {
        return (
            <Box style={styles.titleWrapper} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
                <Text style={styles.titleLabel} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    最新動態
                </Text>
                <Pressable>
                    <MaterialIcon
                        name="filter-list"
                        size={24}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    />
                </Pressable>
            </Box>
        );
    };

    const renderPostFooter = () => <Box style={{ width: '100%', height: 100 }}></Box>;

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <Box style={{ marginTop: 56 }}>
                <SearchBar
                    placeholder={'搜尋文章、評論（上限20字）'}
                    editable={false}
                    onPressIn={() => navigation.navigate('ShareSearchScreen', { category: null })}
                />
            </Box>
            <Box style={styles.categoryWrapper}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                />
            </Box>
            <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={(item, index) => index}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderPostHeader}
                ListFooterComponent={renderPostFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                        onRefresh={fetchPosts}
                    />
                }
            />
            <AddPostButton style={styles.fabWrapper} onPress={() => alert('敬請期待！')} />
            {loading && <Loading />}
        </Box>
    );
};

export default ShareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryWrapper: {
        marginTop: 12,
        marginBottom: 25,
    },
    categoryBox: {
        width: 76,
        height: 30,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    categoryImage: {
        width: 20,
        height: 20,
    },
    categoryName: {
        fontSize: 14,
        marginLeft: 6,
    },
    titleWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 12,
    },
    titleLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 'auto',
    },
    fabWrapper: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
});
