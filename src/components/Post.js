import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable} from 'native-base';

const Post = ({navigation, item}) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/');
    }
    
    return (
        <Pressable
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: "#fff" }}
            style={styles.postBox}
            onPress={null}
        >
            <Box style={styles.postLeftBox}>
                <Image source={{uri: item.image}} style={styles.postImage} resizeMode="cover"/>
                <Box style={styles.postInfoBox}>
                    <Text
                        style={[styles.categoryBox,{
                            borderColor: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                            color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400]
                        }]}
                    >{item.category}</Text>
                    <Text
                        style={styles.region}
                        color={colors.dark[300]}
                    >{item.region}・{item.town}</Text>
                </Box>
            </Box>
            <Box style={styles.postRightBox}>
                <Box style={styles.authorBox}>
                    <Image source={{uri: item.image}} style={styles.authorAvatar} resizeMode="cover"/>
                    <Box style={styles.postRightTopBox}>
                        <Text
                            style={styles.authorName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >{item.author}</Text>
                        <Text
                            style={styles.createDate}
                            color={colors.dark[400]}
                        >{formatDate(item.create_at)}</Text>
                    </Box>
                </Box>
                <Text
                    style={styles.postTitle}
                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                >{item.title}</Text>
                {
                    item.content.length > 35
                    ? <Text 
                        style={styles.postContent}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >{item.content.slice(0,36)}...</Text>
                    : <Text
                        style={styles.postContent}
                        color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                    >{item.content}</Text>
                }
            </Box>
        </Pressable>
    );
}

export { Post };

const styles = StyleSheet.create({
    postBox: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    postImage: {
        width: 140,
        height: 88,
    },
    postInfoBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    categoryBox: {
        fontSize: Platform.OS === 'ios' ? 11 : 9,
        lineHeight: Platform.OS === 'ios' ? 18 : 15,
        lineHeight: 16,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: Platform.OS === 'ios' ? 8 : 5,
        marginRight: 8,
    },
    region: {
        fontSize: Platform.OS === 'ios' ? 12 : 10,
    },
    postRightBox: {
        marginLeft: 10,
    },
    authorBox: {

    },
    authorName: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 14,
    },
    createDate: {
        fontSize: 11,
        lineHeight: 11,
    },
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    authorBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    postTitle: {
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        lineHeight: Platform.OS === 'ios' ? 20 : 16,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 3,
    },
    postContent: {
        fontSize: Platform.OS === 'ios' ? 12 : 11,
        lineHeight: Platform.OS === 'ios' ? 18 : 15,
        width: Platform.OS === 'ios' ? 172 : '36%',
    },
});