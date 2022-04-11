import React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from '../components/SearchBar';
import { categories } from '../data/categories';
import { Post } from '../components/Post';
import postData from '../json/post.json';

const ShareScreen = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const renderItem = ({item}) => {
        return (
            <Pressable
                _dark={{ bg: colors.dark[100] }}
                _light={{ bg: "#fff" }}
                style={styles.categoryBox}
                onPress={null}
            >
                <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
                <Text
                    style={styles.categoryName}
                    color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                >{item.name}</Text>
            </Pressable>
        );
    }

    return(
        <Box
            style={styles.container}
            _dark={{ bg: colors.dark[50]}}
            _light={{ bg: colors.dark[600]}}
        >
            <SearchBar placeholderText={'搜尋景點、行程'} style={{marginTop: 56}}/>
            <Box style={styles.categoryWrapper}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24 }}
                />
            </Box>
            <Box style={styles.titleWrapper}>
                <Text
                    style={styles.titleLabel}
                    color={colorMode === "dark" ? colors.dark[600]: colors.dark[200]}
                >最新動態</Text>
                <Pressable>
                    <MaterialIcon name="filter-list" size={24} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]} />
                </Pressable>
            </Box>
            <Box style={styles.postWrapper}>
                {
                    postData.map((item, index)=> {
                        return <Post item={item} key={index}/>
                    })
                }
            </Box>
        </Box>
    );
}

export default ShareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryWrapper: {
        marginTop: 20,
        marginBottom: 30,
    },
    categoryBox: {
        width: 90,
        height: 110,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    categoryImage: {
        width: 36,
        height: 36,
    },
    categoryName: {
        fontSize: 14,
        marginTop: 6,
    },
    titleWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
    },
    titleLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 'auto',
    },
    postWrapper: {
        marginTop: 15,
        paddingHorizontal: 24,
    },
});