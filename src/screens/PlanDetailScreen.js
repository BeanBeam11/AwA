import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlanDetailHeader } from '../components/Header';
import { formatDate, formatTime } from '../utils/formatter';
import planData from '../json/myPlan.json';

const PlanDetailScreen = ({ navigation, route }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { planName } = route.params;

    const planArray = planData.filter((el) => el.name === planName);
    const plan = planArray[0];

    const [day, setDay] = useState(plan.plan.length);

    const renderTabBar = (props) => (
        <ScrollableTabBar
            {...props}
            style={{
                borderBottomWidth: 0,
                height: 45,
                backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
            }}
            tabsContainerStyle={{
                justifyContent: 'flex-start',
            }}
        />
    );

    const handleGoToEdit = async () => {
        await SheetManager.hide('edit_sheet');
        navigation.navigate('PlanDetailEditScreen');
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: '#fff' }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <PlanDetailHeader navigation={navigation} onPress={() => SheetManager.show('edit_sheet')} />
                <Box style={styles.infoWrapper}>
                    <Image source={{ uri: plan.cover_image }} style={styles.introImage} resizeMode="cover" />
                    <Box style={styles.introBox}>
                        <Text
                            style={styles.introName}
                            color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        >
                            {plan.name}
                        </Text>
                        <Text style={styles.introDate} color={colors.dark[300]}>
                            {formatDate(plan.start_date)}-{formatDate(plan.end_date)}
                        </Text>
                        <Box style={styles.groupWrapper}>
                            <Image source={{ uri: plan.owner_image }} style={styles.ownerAvatar} resizeMode="cover" />
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
            </Box>
            <ScrollableTabView
                initialPage={0}
                renderTabBar={renderTabBar}
                tabBarUnderlineStyle={{
                    backgroundColor: colors.secondary[200],
                    position: 'absolute',
                    bottom: 0,
                    height: 3,
                }}
                tabBarTextStyle={{ fontSize: 14 }}
                tabBarActiveTextColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                tabBarInactiveTextColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
            >
                {plan.plan.map((item, index) => {
                    const firstDate = new Date(plan.start_date);
                    const currentDate = formatDate(firstDate.setDate(firstDate.getDate() + index)).slice(5, 10);

                    return (
                        <Box style={styles.detailWrapper} tabLabel={`Day ${index + 1}`}>
                            <Box style={styles.detailHeader}>
                                <Text
                                    style={styles.dayText}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    {`Day ${index + 1}`}
                                </Text>
                                <Text style={styles.dateText} color={colors.dark[400]}>
                                    {currentDate}
                                </Text>
                            </Box>
                            {item.map((val, index) => {
                                return (
                                    <Box style={styles.detailContent}>
                                        <Box style={styles.detailTime}>
                                            <Text color={colors.dark[300]}>11:00</Text>
                                            <MaterialIcon
                                                name="restaurant"
                                                size={20}
                                                color={
                                                    colorMode === 'dark' ? colors.secondary[100] : colors.secondary[200]
                                                }
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
                                                        {index + 1}
                                                    </Text>
                                                </Box>
                                                <Text
                                                    style={styles.planSightName}
                                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                                >
                                                    {val.sight}
                                                </Text>
                                                <Box style={styles.planBoxNote}>
                                                    <Box style={styles.planStayTime}>
                                                        <MaterialCommunityIcons
                                                            name="clock-time-four"
                                                            size={14}
                                                            color={colors.dark[400]}
                                                            style={{ marginRight: 4 }}
                                                        />
                                                        <Text color={colors.dark[300]}>00:40</Text>
                                                    </Box>
                                                    {val.note && <Text color={colors.dark[300]}>註：{val.note}</Text>}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Image
                                            source={{ uri: plan.cover_image }}
                                            style={styles.detailImage}
                                            resizeMode="cover"
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    );
                })}
            </ScrollableTabView>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 11,
        marginRight: 8,
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
