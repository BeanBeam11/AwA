import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { CityListHorizontal } from '../components/CityList';
import { SightList } from '../components/SightList';
import { PlanList } from '../components/PlanList';
import { SearchBar } from '../components/SearchBar';
import { News } from '../components/News';

const HomeScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box style={styles.header}>
                    <Text style={styles.headerText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        探索
                    </Text>
                    <Pressable onPress={null}>
                        <MaterialIcon name="notifications" size={24} color={colors.primary[100]} />
                    </Pressable>
                </Box>
                <SearchBar style={styles.searchBar} placeholder={'搜尋景點、行程'} />
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            地區
                        </Text>
                        <Pressable
                            style={styles.sectionRightBox}
                            onPress={() => navigation.navigate('SearchRegionScreen')}
                        >
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <CityListHorizontal navigation={navigation} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            推薦景點
                        </Text>
                        <Pressable
                            style={styles.sectionRightBox}
                            onPress={() => navigation.navigate('RecommendSightScreen')}
                        >
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <SightList navigation={navigation} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text
                            style={styles.sectionTitle}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            熱門行程
                        </Text>
                        <Pressable style={styles.sectionRightBox} onPress={() => navigation.navigate('PlanListScreen')}>
                            <Text
                                style={styles.sectionTitleRight}
                                color={colorMode === 'dark' ? colors.dark[500] : colors.dark[300]}
                            >
                                更多
                            </Text>
                        </Pressable>
                    </Box>
                    <PlanList navigation={navigation} />
                </Box>
                <Box style={styles.sectionWrapper}>
                    <Box style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>最新消息</Text>
                    </Box>
                    <News style={{ marginHorizontal: 24 }} />
                </Box>
            </ScrollView>
            <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        </Box>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 60,
    },
    header: {
        width: '100%',
        height: 65,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 12,
        marginTop: 44,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '500',
        marginRight: 'auto',
    },
    searchBar: {
        marginBottom: 20,
    },
    sectionWrapper: {
        marginBottom: 30,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 24,
    },
    sectionRightBox: {
        marginLeft: 'auto',
    },
    sectionTitleRight: {
        fontSize: 14,
        fontWeight: '500',
    },
});
