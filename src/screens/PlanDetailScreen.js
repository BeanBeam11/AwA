import React from 'react';
import { StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { PlanDetailHeader } from '../components/Header';
import { formatDate, formatTime } from '../utils/formatter';
import planData from '../json/myPlan.json';

const PlanDetailScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const handleGoToEdit = async () => {
        await SheetManager.hide('edit_sheet');
        navigation.navigate('PlanDetailEditScreen');
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <PlanDetailHeader navigation={navigation} onPress={() => SheetManager.show('edit_sheet')} />
                <Box style={styles.infoWrapper}>
                    <Image source={{ uri: planData[0].cover_image }} style={styles.introImage} resizeMode="cover" />
                    <Box style={styles.introBox}>
                        <Text
                            style={styles.introName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {planData[0].name}
                        </Text>
                        <Text style={styles.introDate} color={colors.dark[300]}>
                            {formatDate(planData[0].start_date)}-{formatDate(planData[0].end_date)}
                        </Text>
                        <Box style={styles.groupWrapper}>
                            <Image
                                source={{ uri: planData[0].owner_image }}
                                style={styles.ownerAvatar}
                                resizeMode="cover"
                            />
                            <Pressable
                                style={[styles.shareBtn, { borderColor: colors.primary[200] }]}
                                onPress={() => alert('正在開發中...༼ ༎ຶ ෴ ༎ຶ༽')}
                            >
                                <MaterialIcon name="add" size={14} color={colors.primary[200]} />
                                <Text style={styles.shareText} color={colors.primary[200]}>
                                    共用
                                </Text>
                            </Pressable>
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.dayWrapper}>
                    <Box style={[styles.dayBox, { borderBottomWidth: 3, borderBottomColor: colors.secondary[200] }]}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            Day 1
                        </Text>
                    </Box>
                    <Box style={styles.dayBox}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            Day 2
                        </Text>
                    </Box>
                    <Box style={styles.dayBox}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            Day 3
                        </Text>
                    </Box>
                </Box>
            </Box>
            <ScrollView>
                <Box style={styles.detailWrapper}>
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 1
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/04 (六)
                        </Text>
                    </Box>
                    <Box style={styles.detailContent}>
                        <Box style={styles.detailTime}>
                            <Text color={colors.dark[300]}>11:00</Text>
                            <MaterialIcon
                                name="restaurant"
                                size={20}
                                color={colorMode === 'dark' ? colors.secondary[100] : colors.secondary[200]}
                                style={styles.detailType}
                            />
                        </Box>
                        <Box>
                            <Box style={[styles.detailbox, { borderLeftColor: colors.primary[100] }]}>
                                <Box
                                    _dark={{ bg: colors.primary[100] }}
                                    _light={{ bg: colors.primary[100] }}
                                    style={styles.planIndexBox}
                                >
                                    <Text
                                        style={styles.planIndex}
                                        color={colorMode === 'dark' ? colors.dark[200] : '#fff'}
                                    >
                                        1
                                    </Text>
                                </Box>
                                <Text
                                    style={styles.planSightName}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    阿妹茶樓
                                </Text>
                                <Text
                                    style={styles.planStayTime}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    停留02時00分
                                </Text>
                            </Box>
                        </Box>
                        <Image
                            source={{ uri: planData[0].cover_image }}
                            style={styles.detailImage}
                            resizeMode="cover"
                        />
                    </Box>
                    <Box style={styles.detailContent}>
                        <Box style={styles.detailTime}>
                            <Text color={colors.dark[300]}>13:00</Text>
                            <MaterialIcon
                                name="restaurant"
                                size={20}
                                color={colorMode === 'dark' ? colors.secondary[100] : colors.secondary[200]}
                                style={styles.detailType}
                            />
                        </Box>
                        <Box>
                            <Box style={[styles.detailbox, { borderLeftColor: colors.primary[100] }]}>
                                <Box
                                    _dark={{ bg: colors.primary[100] }}
                                    _light={{ bg: colors.primary[100] }}
                                    style={styles.planIndexBox}
                                >
                                    <Text
                                        style={styles.planIndex}
                                        color={colorMode === 'dark' ? colors.dark[200] : '#fff'}
                                    >
                                        2
                                    </Text>
                                </Box>
                                <Text
                                    style={styles.planSightName}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    草仔粿
                                </Text>
                                <Text
                                    style={styles.planStayTime}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    停留00時20分
                                </Text>
                            </Box>
                        </Box>
                        <Image
                            source={{ uri: planData[0].cover_image }}
                            style={styles.detailImage}
                            resizeMode="cover"
                        />
                    </Box>
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 2
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/05 (日)
                        </Text>
                    </Box>
                    <Box style={styles.detailContent}>
                        <Box style={styles.detailTime}>
                            <Text color={colors.dark[300]}>12:00</Text>
                            <MaterialIcon
                                name="restaurant"
                                size={20}
                                color={colorMode === 'dark' ? colors.secondary[100] : colors.secondary[200]}
                                style={styles.detailType}
                            />
                        </Box>
                        <Box>
                            <Box style={[styles.detailbox, { borderLeftColor: colors.primary[100] }]}>
                                <Box
                                    _dark={{ bg: colors.primary[100] }}
                                    _light={{ bg: colors.primary[100] }}
                                    style={styles.planIndexBox}
                                >
                                    <Text
                                        style={styles.planIndex}
                                        color={colorMode === 'dark' ? colors.dark[200] : '#fff'}
                                    >
                                        1
                                    </Text>
                                </Box>
                                <Text
                                    style={styles.planSightName}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    阿妹茶樓
                                </Text>
                                <Text
                                    style={styles.planStayTime}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    停留01時30分
                                </Text>
                            </Box>
                        </Box>
                        <Image
                            source={{ uri: planData[0].cover_image }}
                            style={styles.detailImage}
                            resizeMode="cover"
                        />
                    </Box>
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 3
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/06 (六)
                        </Text>
                    </Box>
                </Box>
            </ScrollView>
            <ActionSheet id="edit_sheet">
                <Box style={styles.editSheet} _dark={{ bg: colors.dark[100] }} _light={{ bg: colors.dark[600] }}>
                    <Pressable style={styles.actionBox} onPress={() => handleGoToEdit()}>
                        <Text style={styles.actionText} color={colors.primary[200]}>
                            編輯
                        </Text>
                    </Pressable>
                    <Box style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: colors.dark[500] }}></Box>
                    <Pressable style={styles.actionBox} onPress={() => alert('現在還不能刪掉呦...')}>
                        <Text style={styles.actionText} color={'#DD9193'}>
                            刪除
                        </Text>
                    </Pressable>
                    <Box style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: colors.dark[500] }}></Box>
                    <Pressable style={styles.actionBox} onPress={async () => await SheetManager.hide('edit_sheet')}>
                        <Text style={styles.actionText} color={colors.dark[400]}>
                            取消
                        </Text>
                    </Pressable>
                </Box>
            </ActionSheet>
        </Box>
    );
};

export default PlanDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    introBox: {
        marginLeft: 12,
    },
    introImage: {
        width: 172,
        height: 95,
        borderRadius: 5,
        backgroundColor: '#969696',
    },
    introName: {
        fontSize: 16,
        fontWeight: '500',
    },
    introDate: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#969696',
    },
    groupWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    shareBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 20,
        marginLeft: 12,
    },
    shareText: {
        fontSize: 11,
    },
    dayWrapper: {
        width: '100%',
        height: 36,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 4,
    },
    dayBox: {
        width: 45,
        height: 32,
        marginHorizontal: 12,
    },
    dayBoxText: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    detailWrapper: {
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingBottom: 80,
    },
    detailHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        marginBottom: 10,
    },
    dayText: {
        fontSize: 16,
        fontWeight: '500',
    },
    dateText: {
        fontSize: 11,
        color: '#969696',
        marginLeft: 10,
    },
    detailContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    detailTime: {
        alignItems: 'center',
    },
    detailType: {
        marginTop: 5,
    },
    detailbox: {
        marginLeft: 25,
        paddingLeft: 24,
        paddingBottom: 20,
        borderLeftWidth: 1.5,
    },
    planIndexBox: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left: -11,
    },
    planIndex: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        lineHeight: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
    },
    planSightName: {
        fontSize: 16,
        fontWeight: '500',
    },
    planStayTime: {
        fontSize: 11,
    },
    detailImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginLeft: 'auto',
    },
    editSheet: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    actionBox: {
        width: '80%',
        paddingVertical: 18,
        alignItems: 'center',
    },
    actionText: {
        fontSize: 20,
    },
});
