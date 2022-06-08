import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, ScrollView, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { SearchGoBackHeader } from '../components/Header';
import { Post } from '../components/Post';
import postData from '../json/post.json';

const ShareSearchScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { category } = route.params;
    const [keyword, setKeyword] = useState(category ? `#${category}` : '');
    const [postResult, setPostResult] = useState([]);

    useEffect(() => {
        setPostResult(postData.filter((el) => el.category === category));
    }, []);

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
                <SearchGoBackHeader
                    navigation={navigation}
                    placeholder={'搜尋文章、評論'}
                    onChangeText={(text) => handleSearch(text)}
                    value={keyword}
                />
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
        </Box>
    );
};

export default ShareSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listWrapper: {
        paddingHorizontal: 24,
        marginTop: 20,
    },
});
