import React, { useState } from 'react';
import { StyleSheet, Image, View, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Input } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { TimePicker } from 'react-native-simple-time-picker';
import { PlanDetailHeader } from '../components/Header';
import planData from '../json/myPlan.json';
import { ActionButton } from '../components/ActionButton';

const PlanDetailScreen = ({navigation}) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ stayModalVisible, setStayModalVisible ] = useState(false);
    const [ sightName, setSightName ] = useState('');
    const [ sightType, setSightType ] = useState('');
    const [ sightNote, setSightNote ] = useState('');
    const [ stayTime, setStayTime ] = useState({hours: 0, minutes: 0});

    const handleFinished = () => {
        setModalVisible(!modalVisible);
    }

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
    
    return(
        <Box
            style={styles.container}
            _dark={{ bg: colors.dark[50]}}
            _light={{ bg: "#fff"}}
        >
            <Box
                style={styles.topWrapper}
                _dark={{ bg: colors.dark[100]}}
                _light={{ bg: "#fff"}}
            >
                <PlanDetailHeader navigation={navigation}/>
                <Box style={styles.infoWrapper}>
                    <Image source={{uri: planData[0].cover_image}} style={styles.introImage} resizeMode="cover" />
                    <Box style={styles.introBox}>
                        <Text
                            style={styles.introName}
                            color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                        >{planData[0].name}</Text>
                        <Text
                            style={styles.introDate}
                            color={colors.dark[300]}
                        >{formatDate(planData[0].start_date)}-{formatDate(planData[0].end_date)}</Text>
                        <Image source={{uri: planData[0].owner_image}} style={styles.ownerAvatar} resizeMode="cover" />
                    </Box>
                </Box>
                <Box style={styles.dayWrapper}>
                    <Box style={styles.dayBox}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                        >Day 1</Text>
                    </Box>
                    <Box style={styles.dayBox}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                        >Day 2</Text>
                    </Box>
                    <Box style={styles.dayBox}>
                        <Text
                            style={styles.dayBoxText}
                            color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                        >Day 3</Text>
                    </Box>
                    <Box 
                        _dark={{ bg: colors.primary[100]}}
                        _light={{ bg: colors.primary[100]}}
                        style={styles.addDayBtn}
                    >
                        <MaterialIcon name="add" size={20} color={ colorMode === "dark" ? colors.dark[200] : '#fff' } />
                    </Box>
                </Box>
            </Box>
            <ScrollView>
            <Box style={styles.detailWrapper}>
                <Box style={styles.detailHeader}>
                    <Text
                        style={styles.dayText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >Day 1</Text>
                    <Text
                        style={styles.dateText}
                        color={colors.dark[400]}
                    >04/04 (六)</Text>
                </Box>
                <Box style={styles.detailContent}>
                    <Box style={styles.detailTime}>
                        <Text color={colors.dark[300]}>11:00</Text>
                        <MaterialIcon name="restaurant" size={20} color={colorMode === "dark" ? colors.secondary[100]: colors.secondary[200]} style={styles.detailType}/>
                    </Box>
                    <Box>
                        <Box style={[styles.detailbox,{borderLeftColor: colors.primary[100]}]}>
                            <Box
                                _dark={{ bg: colors.primary[100]}}
                                _light={{ bg: colors.primary[100]}}
                                style={styles.planIndexBox}
                            >
                                <Text
                                    style={styles.planIndex}
                                    color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                                >1</Text>
                            </Box>
                            <Text
                                style={styles.planSightName}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >阿妹茶樓</Text>
                            <Text
                                style={styles.planStayTime}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >停留02時00分</Text>
                        </Box>
                    </Box>
                </Box>
                <Box style={styles.detailContent}>
                    <Box style={styles.detailTime}>
                        <Text color={colors.dark[300]}>13:00</Text>
                        <MaterialIcon name="restaurant" size={20} color={colorMode === "dark" ? colors.secondary[100]: colors.secondary[200]} style={styles.detailType}/>
                    </Box>
                    <Box>
                        <Box style={[styles.detailbox,{borderLeftColor: colors.primary[100]}]}>
                            <Box
                                _dark={{ bg: colors.primary[100]}}
                                _light={{ bg: colors.primary[100]}}
                                style={styles.planIndexBox}
                            >
                                <Text
                                    style={styles.planIndex}
                                    color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                                >2</Text>
                            </Box>
                            <Text
                                style={styles.planSightName}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >草仔粿</Text>
                            <Text
                                style={styles.planStayTime}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >停留00時20分</Text>
                        </Box>
                    </Box>
                </Box>
                <Pressable
                    _dark={{ bg: colors.primary[100]}}
                    _light={{ bg: colors.primary[100]}}
                    style={styles.addPlanDetailBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcon name="add" size={16} color={colorMode === "dark" ? colors.dark[200] : '#fff'} />
                    <Text
                        style={styles.addPlanDetailBtnText}
                        color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                    >新增</Text>
                </Pressable>
                <Box style={styles.detailHeader}>
                    <Text
                        style={styles.dayText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >Day 2</Text>
                    <Text
                        style={styles.dateText}
                        color={colors.dark[400]}
                    >04/05 (日)</Text>
                </Box>
                <Box style={styles.detailContent}>
                    <Box style={styles.detailTime}>
                        <Text color={colors.dark[300]}>12:00</Text>
                        <MaterialIcon name="restaurant" size={20} color={colorMode === "dark" ? colors.secondary[100]: colors.secondary[200]} style={styles.detailType}/>
                    </Box>
                    <Box>
                        <Box style={[styles.detailbox,{borderLeftColor: colors.primary[100]}]}>
                            <Box
                                _dark={{ bg: colors.primary[100]}}
                                _light={{ bg: colors.primary[100]}}
                                style={styles.planIndexBox}
                            >
                                <Text
                                    style={styles.planIndex}
                                    color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                                >1</Text>
                            </Box>
                            <Text
                                style={styles.planSightName}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >阿妹茶樓</Text>
                            <Text
                                style={styles.planStayTime}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >停留01時30分</Text>
                        </Box>
                    </Box>
                </Box>
                <Pressable
                    _dark={{ bg: colors.primary[100]}}
                    _light={{ bg: colors.primary[100]}}
                    style={styles.addPlanDetailBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcon name="add" size={16} color={colorMode === "dark" ? colors.dark[200] : '#fff'} />
                    <Text
                        style={styles.addPlanDetailBtnText}
                        color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                    >新增</Text>
                </Pressable>
                <Box style={styles.detailHeader}>
                    <Text
                        style={styles.dayText}
                        color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                    >Day 3</Text>
                    <Text
                        style={styles.dateText}
                        color={colors.dark[400]}
                    >04/06 (六)</Text>
                </Box>
                <Pressable
                    _dark={{ bg: colors.primary[100]}}
                    _light={{ bg: colors.primary[100]}}
                    style={styles.addPlanDetailBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcon name="add" size={16} color={colorMode === "dark" ? colors.dark[200] : '#fff'} />
                    <Text
                        style={styles.addPlanDetailBtnText}
                        color={colorMode === "dark" ? colors.dark[200] : '#fff'}
                    >新增</Text>
                </Pressable>
            </Box>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.modalView(colorMode),{
                    backgroundColor: colorMode === "dark" ? colors.dark[100] : '#fff',
                }]}>
                    <Box style={[styles.modalHeader,{
                        borderBottomColor: colorMode === "dark" ? colors.dark[200] : colors.dark[500],
                    }]}>
                        <Text style={styles.modalHeaderText}>新增景點</Text>
                        <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcon name="close" size={24} color={ colorMode === "dark" ? '#fff' : '#484848' }/>
                        </TouchableOpacity>
                    </Box>
                    <Box style={styles.imageWrapper}>
                        <Image src={null} style={styles.image} />
                    </Box>
                    <Box style={styles.modalContent}>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >行程名稱</Text>
                            <Box style={[styles.optionRight,{
                                borderBottomColor: colors.dark[500]
                            }]}>
                                <Text
                                    color={colors.dark[300]}
                                >{planData[0].name}</Text>
                            </Box>
                            
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >景點名稱</Text>
                            <Box style={[styles.optionRight,{
                                borderBottomColor: colors.dark[500]
                            }]}>
                                <TextInput
                                    placeholder="輸入景點名稱"
                                    placeholderTextColor={colors.dark[400]}
                                    value={sightName}
                                    onChangeText={text => setSightName(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >備註(選填)</Text>
                            <Box style={[styles.optionRight,{
                                borderBottomColor: colors.dark[500]
                            }]}>
                                <TextInput
                                    placeholder="輸入備註"
                                    placeholderTextColor={colors.dark[400]}
                                    value={sightNote}
                                    onChangeText={text => setSightNote(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >景點類別</Text>
                            <Box
                                _dark={{ bg: colors.dark[200]}}
                                _light={{ bg: colors.secondary[50]}}
                                style={styles.optionSelectBox}
                            >
                                <Box>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={(value) => setSightType(value)}
                                        items={[
                                            { label: '景點', value: 'landmark' },
                                            { label: '美食', value: 'food' },
                                            { label: '購物', value: 'shopping' },
                                            { label: '住宿', value: 'hotel' },
                                        ]}
                                    />
                                </Box>
                            </Box>
                            
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >加入天數</Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200]}}
                                _light={{ bg: colors.secondary[50]}}
                                style={styles.optionSelectBox}
                                onPress={null}
                            >
                                <Text style={{color: '#969696'}}>Day 1</Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text
                                style={styles.modalLabel}
                                color={colorMode === "dark" ? colors.dark[600] : colors.dark[200]}
                            >停留時間</Text>
                            <Pressable
                                _dark={{ bg: colors.dark[200]}}
                                _light={{ bg: colors.secondary[50]}}
                                style={styles.optionSelectBox}
                                onPress={()=> setStayModalVisible(!stayModalVisible)}
                            >
                                <Text>{stayTime.hours}時{stayTime.minutes}分</Text>
                            </Pressable>
                        </Box>
                    </Box>
                    <Pressable style={{marginTop: Platform.OS === 'ios' ? 80 : 40}} onPress={()=> handleFinished()} >
                        <ActionButton text={"完成"}/>
                    </Pressable>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={stayModalVisible}
                    onRequestClose={() => {
                        setStayModalVisible(!stayModalVisible);
                    }}
                >
                    <View style={styles.TimePickerModalView}>
                        <Box
                            _dark={{ bg: "#C4C4C4"}}
                            _light={{ bg: "#E5E5E5"}}
                            style={styles.timePickerBox}
                        >
                            <TimePicker
                                hoursUnit='時'
                                minutesUnit="分"
                                value={stayTime} onChange={(value) => setStayTime(value)}
                            />
                        </Box>
                        <Pressable
                            _dark={{ bg: "#C4C4C4"}}
                            _light={{ bg: "#fff"}}
                            style={styles.timePickerConfirmBtn}
                            onPress={()=> setStayModalVisible(!stayModalVisible)}
                        >
                            <Text>確定</Text>
                        </Pressable>
                        <Pressable
                            _dark={{ bg: "#C4C4C4"}}
                            _light={{ bg: "#fff"}}
                            style={styles.timePickerCancelBtn}
                            onPress={()=> setStayModalVisible(!stayModalVisible)}
                        >
                            <Text style={{ color: '#969696'}}>取消</Text>
                        </Pressable>
                    </View>
                </Modal>
            </Modal>
        </Box>
    );
}

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
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    dayWrapper: {
        width: '100%',
        height: 36,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    dayBox: {
        width: 45,
        marginHorizontal: 12,
    },
    dayBoxText: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '500',
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
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    planSightName: {
        fontSize: 16,
        fontWeight: '500',
    },
    planStayTime: {
        fontSize: 11,
    },
    addPlanDetailBtn: {
        width: 75,
        height: 28,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    addPlanDetailBtnText: {
        fontSize: 14,
        marginLeft: 3,
    },
    modalView: (colorMode) => ({
        width: '100%',
        height: Platform. OS === 'ios' ? '95%' : '99%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: colorMode === "dark" ? '#484848' : '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    }),
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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
        marginTop: Platform.OS === 'ios' ? 20 : 10,
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
    TimePickerModalView: {
        marginTop: 'auto',
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -15,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
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