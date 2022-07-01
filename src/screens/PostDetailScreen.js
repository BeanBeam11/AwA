import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoBackHeader } from '../components/Header';
import { Sight_H } from '../components/Sight_H';
import { SpotDetailModal } from '../components/SpotDetailModal';
import { formatDate } from '../utils/formatter';
import postData from '../json/post';
import sightData from '../json/recommendSight';

const PostDetailScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { post } = route.params;

    const sight = null;

    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [spotModalVisible, setSpotModalVisible] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(sight);

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
            <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
                <GoBackHeader title={post.title} navigation={navigation} />
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Image source={{ uri: post.cover_image }} style={styles.image} resizeMode="cover" />
                    <Box style={styles.postInfoBox}>
                        <Text
                            style={[
                                styles.categoryBox,
                                {
                                    borderColor: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                },
                            ]}
                        >
                            {post.category}
                        </Text>
                        <Text style={styles.location} color={colors.dark[300]}>
                            {post.city}・{post.town}
                        </Text>
                    </Box>
                    <Text style={styles.name} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {post.title}
                    </Text>
                    <Box style={styles.infoWrapper}>
                        <Image source={{ uri: post.author.photo }} style={styles.authorAvatar} resizeMode="cover" />
                        <Text
                            style={styles.authorName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {post.author.name}
                        </Text>
                        <Text style={styles.createDate} color={colors.dark[400]}>
                            {formatDate(post.created_at)}
                        </Text>
                    </Box>
                    <Text style={styles.content} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {post.content}
                    </Text>
                    <Box>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            相關景點
                        </Text>
                        {sight && (
                            <Sight_H
                                item={sight}
                                navigation={navigation}
                                onPress={() => {
                                    setSpotModalVisible(!spotModalVisible);
                                    setSelectedSpot(sight);
                                }}
                            />
                        )}
                    </Box>
                    <Box _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }} style={styles.reactionWrapper}>
                        <Box
                            style={[
                                styles.reactionBar,
                                { borderColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[600] },
                            ]}
                        >
                            <Box style={styles.reactionGroup}>
                                <Pressable onPress={() => setIsLike(!isLike)}>
                                    {isLike ? (
                                        <MaterialCommunityIcons name="thumb-up" size={24} color={colors.primary[200]} />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="thumb-up-outline"
                                            size={24}
                                            color={colors.primary[200]}
                                        />
                                    )}
                                </Pressable>
                                <Text style={styles.reactionText} color={colors.dark[400]}>
                                    {post.liked_by.length}
                                </Text>
                            </Box>
                            <Box style={styles.reactionGroup}>
                                <Pressable onPress={() => setIsDislike(!isDislike)}>
                                    {isDislike ? (
                                        <MaterialCommunityIcons
                                            name="thumb-down"
                                            size={24}
                                            color={colors.primary[200]}
                                        />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="thumb-down-outline"
                                            size={24}
                                            color={colors.primary[200]}
                                        />
                                    )}
                                </Pressable>
                                <Text style={styles.reactionText} color={colors.dark[400]}>
                                    {post.disliked_by.length}
                                </Text>
                            </Box>
                            <Box style={styles.reactionGroup}>
                                <Pressable>
                                    <MaterialCommunityIcons
                                        name="comment-text-outline"
                                        size={24}
                                        color={colors.primary[200]}
                                    />
                                </Pressable>
                                <Text style={styles.reactionText} color={colors.dark[400]}>
                                    {post.reviews ? post.reviews.length : 0}
                                </Text>
                            </Box>
                            <Box style={styles.reactionGroup}>
                                <Pressable onPress={() => setIsSaved(!isSaved)}>
                                    {isSaved ? (
                                        <MaterialCommunityIcons name="bookmark" size={24} color={colors.primary[200]} />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name="bookmark-outline"
                                            size={24}
                                            color={colors.primary[200]}
                                        />
                                    )}
                                </Pressable>
                                <Text style={styles.reactionText} color={colors.dark[400]}>
                                    {post.saved_by.length}
                                </Text>
                            </Box>
                        </Box>
                        <Box style={styles.commentWrapper}>
                            {post.reviews &&
                                post.reviews.map((el, index) => {
                                    return (
                                        <Box style={styles.commentBox} key={index}>
                                            <Box style={styles.commentInfo}>
                                                <Image
                                                    source={{ uri: post.image }}
                                                    style={styles.authorAvatar}
                                                    resizeMode="cover"
                                                />
                                                <Text
                                                    style={styles.authorName}
                                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                                >
                                                    {el.username}
                                                </Text>
                                                <Text style={styles.createDate} color={colors.dark[400]}>
                                                    {formatDate(el.create_at)}
                                                </Text>
                                            </Box>
                                            <Text
                                                style={styles.commentContent}
                                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                            >
                                                {el.content}
                                            </Text>
                                            <Box
                                                style={[
                                                    styles.commentDivider,
                                                    {
                                                        borderColor:
                                                            colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                                                    },
                                                ]}
                                            ></Box>
                                        </Box>
                                    );
                                })}
                            <Text style={styles.commentNote} color={colors.dark[400]}>
                                沒有更多留言囉 ㅇㅅㅇ
                            </Text>
                        </Box>
                        <Box
                            style={[
                                styles.inputWrapper,
                                { borderColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[600] },
                            ]}
                        >
                            <Box
                                style={styles.input}
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.dark[600] }}
                            >
                                <TextInput
                                    placeholder={'分享你的看法'}
                                    placeholderTextColor={colors.dark[400]}
                                    onChangeText={null}
                                    value={null}
                                    returnKeyType="send"
                                    onSubmitEditing={Keyboard.dismiss}
                                    style={{ width: '100%' }}
                                />
                            </Box>
                            <Pressable style={styles.sendBtn} onPress={null}>
                                <MaterialCommunityIcons name="send" size={24} color={colors.primary[200]} />
                            </Pressable>
                        </Box>
                    </Box>
                </ScrollView>
                <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
            </Box>
            {selectedSpot && (
                <SpotDetailModal
                    isVisible={spotModalVisible}
                    spot={selectedSpot}
                    onBackdropPress={() => setSpotModalVisible(!spotModalVisible)}
                    onSwipeComplete={() => setSpotModalVisible(false)}
                />
            )}
        </KeyboardAwareScrollView>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    image: {
        width: '100%',
        height: 215,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    postInfoBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
    location: {
        fontSize: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 8,
    },
    authorName: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 14,
    },
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    createDate: {
        fontSize: 12,
        lineHeight: 14,
        marginLeft: 8,
    },
    content: {
        fontSize: 14,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 10,
    },
    reactionWrapper: {
        width: '100%',
        borderRadius: 5,
        marginTop: 20,
    },
    reactionBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        width: '100%',
        borderBottomWidth: 3,
    },
    reactionGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15,
    },
    reactionText: {
        marginLeft: 10,
    },
    commentWrapper: {
        width: '100%',
        minHeight: 100,
    },
    commentBox: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    commentInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContent: {
        marginLeft: 32,
    },
    commentDivider: {
        width: 286,
        borderBottomWidth: 1,
        paddingTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    commentNote: {
        fontSize: 11,
        textAlign: 'center',
        paddingVertical: 10,
    },
    inputWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 3,
    },
    input: {
        width: '85%',
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    sendBtn: {
        position: 'absolute',
        right: 15,
    },
});
