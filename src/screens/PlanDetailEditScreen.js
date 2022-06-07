import React, { useState } from 'react';
import { StyleSheet, Image, View, Modal, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Checkbox } from 'native-base';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DraggableFlatList from 'react-native-draggable-flatlist';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TimePicker } from 'react-native-simple-time-picker';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionButton } from '../components/ActionButton';
import { AddButton } from '../components/AddButton';
import { EditHeader } from '../components/Header';
import { formatDate, formatTime } from '../utils/formatter';
import planData from '../json/myPlan.json';

const PlanDetailEditScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [stayTimeModalVisible, setStayTimeModalVisible] = useState(false);
    const [sightName, setSightName] = useState('');
    const [sightNote, setSightNote] = useState('');
    const [startTimeRequired, setStartTimeRequired] = useState(false);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [sightType, setSightType] = useState('');
    const [stayTime, setStayTime] = useState({ hours: 0, minutes: 0 });

    const handleDone = () => {
        navigation.goBack();
    };

    const renderTabBar = (props) => (
        <ScrollableTabBar
            {...props}
            style={{
                borderBottomWidth: 0,
                height: 45,
                backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
            }}
        />
    );

    const initialData = [
        {
            order: 1,
            label: '阿妹茶樓',
        },
        {
            order: 2,
            label: '草仔粿',
        },
        {
            order: 3,
            label: '九份樓梯',
        },
    ];
    const [data, setData] = useState(initialData);

    const renderItem = ({ item, index, drag, isActive }) => (
        <Pressable
            style={[styles.planBox, { width: Dimensions.get('window').width - 48 }]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onLongPress={drag}
        >
            <MaterialCommunityIcons
                name="drag-vertical"
                size={24}
                color={colorMode === 'dark' ? [200] : colors.dark[500]}
            />
            <Box style={[styles.planBoxDivider, { backgroundColor: colors.secondary[200] }]}></Box>
            <Image source={{ uri: planData[0].cover_image }} style={styles.planBoxImage} resizeMode="cover" />
            <Box style={styles.planBoxInfo}>
                <Text style={styles.planSightName}>{item?.label}</Text>
                <Box style={styles.planBoxNote}>
                    <Box style={styles.planStayTime}>
                        <MaterialCommunityIcons
                            name="clock-time-four"
                            size={14}
                            color={colors.dark[400]}
                            style={{ marginRight: 4 }}
                        />
                        <Text color={colors.dark[300]}>01:20</Text>
                    </Box>
                    <Text color={colors.dark[300]}>註：記得拍合照</Text>
                </Box>
            </Box>
            <Pressable style={{ marginLeft: 'auto' }} onPress={() => setModalVisible(!modalVisible)}>
                <MaterialIcon name="edit" size={24} color={colors.dark[400]} />
            </Pressable>
        </Pressable>
    );

    const renderListFooter = () => (
        <AddButton size={'medium'} style={styles.addPlanBox} onPress={() => setModalVisible(!modalVisible)} />
    );

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };
    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };
    const handleStartTimeConfirm = (time) => {
        setStartTime(time);
        hideStartTimePicker();
    };

    const handleFinished = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <Box style={styles.topWrapper} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                <EditHeader navigation={navigation} title={'編輯行程'} onPressDone={handleDone} />
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
                        <Image
                            source={{ uri: planData[0].owner_image }}
                            style={styles.ownerAvatar}
                            resizeMode="cover"
                        />
                    </Box>
                </Box>
            </Box>
            <ScrollableTabView
                style={styles.scrollableStyle}
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
                <Box style={styles.detailWrapper} tabLabel="Day 1">
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 1
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/04 (六)
                        </Text>
                    </Box>
                    <DraggableFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onDragEnd={({ data }) => setData(data)}
                        ListFooterComponent={renderListFooter}
                    />
                </Box>
                <Box style={styles.detailWrapper} tabLabel="Day 2">
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 2
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/05 (日)
                        </Text>
                    </Box>
                </Box>
                <Box style={styles.detailWrapper} tabLabel="Day 3">
                    <Box style={styles.detailHeader}>
                        <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                            Day 3
                        </Text>
                        <Text style={styles.dateText} color={colors.dark[400]}>
                            04/06 (一)
                        </Text>
                    </Box>
                </Box>
                <Pressable
                    style={styles.detailWrapper}
                    tabLabel="+ new"
                    onPress={() => alert('再加一天！')}
                ></Pressable>
            </ScrollableTabView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View
                    style={[
                        styles.modalView,
                        {
                            backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
                        },
                    ]}
                >
                    <Box
                        style={[
                            styles.modalHeader,
                            {
                                borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                            },
                        ]}
                    >
                        <Text style={styles.modalHeaderText}>新增景點</Text>
                        <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcon name="close" size={24} color={colorMode === 'dark' ? '#fff' : '#484848'} />
                        </TouchableOpacity>
                    </Box>
                    <Box style={styles.imageWrapper}>
                        <Image src={null} style={styles.image} />
                    </Box>
                    <Box style={styles.modalContent}>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                行程名稱
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <Text color={colors.dark[300]}>{planData[0].name}</Text>
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                景點名稱
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="輸入景點名稱"
                                    placeholderTextColor={colors.dark[400]}
                                    value={sightName}
                                    onChangeText={(text) => setSightName(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                備註(選填)
                            </Text>
                            <Box
                                style={[
                                    styles.optionRight,
                                    {
                                        borderBottomColor: colors.dark[500],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="輸入備註"
                                    placeholderTextColor={colors.dark[400]}
                                    value={sightNote}
                                    onChangeText={(text) => setSightNote(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Checkbox
                                value={startTimeRequired}
                                onChange={(value) => setStartTimeRequired(value)}
                                accessibilityLabel="enable time"
                                colorScheme="gray"
                                size="sm"
                                mr={3}
                            />
                            <Box>
                                <Text
                                    style={styles.modalLabel}
                                    color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                                >
                                    第一個行程開始時間
                                </Text>
                                <Text style={{ fontSize: 11 }} color={colors.dark[300]}>
                                    （顯示各項行程時間點）
                                </Text>
                            </Box>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={() => showStartTimePicker()}
                            >
                                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                    {formatTime(startTime)}
                                </Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                景點類別
                            </Text>
                            <Box
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={[styles.optionSelectBox, { paddingLeft: Platform.OS === 'ios' ? 0 : 10 }]}
                            >
                                <RNPickerSelect
                                    placeholder={{}}
                                    onValueChange={(value) => setSightType(value)}
                                    items={[
                                        { label: '景點', value: 'landmark' },
                                        { label: '美食', value: 'food' },
                                        { label: '購物', value: 'shopping' },
                                        { label: '住宿', value: 'hotel' },
                                    ]}
                                    style={{
                                        placeholder: {
                                            color: colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                        },
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                        inputAndroid: {
                                            color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                        },
                                        inputIOS: {
                                            color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                        },
                                        viewContainer: { justifyContent: 'center' },
                                        inputIOSContainer: { alignItems: 'center' },
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                加入天數
                            </Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={null}
                            >
                                <Text style={{ color: '#969696' }}>Day 1</Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                            >
                                停留時間
                            </Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200] }}
                                _light={{ bg: colors.secondary[50] }}
                                style={styles.optionSelectBox}
                                onPress={() => SheetManager.show('stayTime_sheet')}
                            >
                                <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                    {stayTime.hours}時{stayTime.minutes}分
                                </Text>
                            </Pressable>
                        </Box>
                    </Box>
                    <ActionButton
                        text={'新增'}
                        style={{ marginTop: Platform.OS === 'ios' ? 60 : 40 }}
                        onPress={() => handleFinished()}
                    />
                </View>
                <DateTimePickerModal
                    date={startTime}
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleStartTimeConfirm}
                    onCancel={hideStartTimePicker}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={stayTimeModalVisible}
                    onRequestClose={() => {
                        setStayTimeModalVisible(!stayTimeModalVisible);
                    }}
                ></Modal>
                <ActionSheet id="stayTime_sheet">
                    <Box
                        style={styles.stayTimeSheet}
                        _dark={{ bg: colors.dark[100] }}
                        _light={{ bg: colors.dark[600] }}
                    >
                        <TimePicker
                            hoursUnit="時"
                            minutesUnit="分"
                            value={stayTime}
                            onChange={(value) => setStayTime(value)}
                            textColor={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}
                        />
                    </Box>
                </ActionSheet>
            </Modal>
        </Box>
    );
};

export default PlanDetailEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 12,
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
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    addDayBtn: {
        width: 36,
        height: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 9,
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
        marginBottom: 20,
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
    planBox: {
        paddingVertical: 12,
        paddingLeft: 6,
        paddingRight: 16,
        borderRadius: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    planBoxDivider: {
        width: 3,
        height: 44,
        marginRight: 10,
    },
    planBoxImage: {
        width: 36,
        height: 36,
        borderRadius: 5,
    },
    planBoxInfo: {
        marginLeft: 10,
    },
    planBoxNote: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addPlanBox: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 200,
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
    modalView: {
        width: '100%',
        height: Platform.OS === 'ios' ? '95%' : '99%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalClose: {
        position: 'absolute',
        right: 0,
    },
    modalContent: {
        marginTop: 10,
    },
    imageWrapper: {
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        marginTop: 10,
    },
    optionRight: {
        width: 250,
        borderBottomWidth: 1,
    },
    optionWrapper: {
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 18,
    },
    optionSelectBox: {
        width: 120,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 20,
    },
    stayTimeSheet: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    timePickerBox: {
        width: '100%',
        height: '45%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 'auto',
    },
    timePickerConfirmBtn: {
        width: '100%',
        height: 50,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    timePickerCancelBtn: {
        width: '100%',
        height: 50,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
