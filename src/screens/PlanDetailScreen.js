import React, { useState } from 'react';
import { StyleSheet, Image, View, Modal, TouchableOpacity } from 'react-native';
import { useColorMode, Box, Text, Pressable, Input } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { TimePicker } from 'react-native-simple-time-picker';
import { PlanDetailHeader } from '../components/Header';

const PlanDetailScreen = ({navigation}) => {
    const { colorMode } = useColorMode();
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ stayModalVisible, setStayModalVisible ] = useState(false);
    const [ sightName, setSightName ] = useState('');
    const [ sightType, setSightType ] = useState('');
    const [ stayTime, setStayTime ] = useState({hours: 0, minutes: 0});

    const handleFinished = () => {
        setModalVisible(!modalVisible);
    }
    
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <PlanDetailHeader navigation={navigation}/>
            <Box style={styles.topWrapper}>
                <Image source={{uri: null}} style={styles.introImage} resizeMode="cover" />
                <Box style={styles.introWrapper}>
                    <Text style={styles.introName}>九份一日遊</Text>
                    <Text style={styles.introDate}>2022/04/02-2022/04/04</Text>
                    <Image source={{uri: null}} style={styles.ownerAvatar} resizeMode="cover" />
                </Box>
            </Box>
            <Box 
                _dark={{ bg: "#484848"}}
                _light={{ bg: "#fff"}}
                style={styles.dayWrapper}
            >
                <Box style={styles.dayBox}>
                    <Text style={styles.dayBoxText}>Day 1</Text>
                </Box>
                <Box style={styles.dayBox}>
                    <Text style={styles.dayBoxText}>Day 2</Text>
                </Box>
                <Box style={styles.dayBox}>
                    <Text style={styles.dayBoxText}>Day 3</Text>
                </Box>
                <Box 
                    _dark={{ bg: "#E5E5E5"}}
                    _light={{ bg: "#969696"}}
                    style={styles.addDayBtn}
                >
                    <MaterialIcon name="add" size={20} color={ colorMode === "dark" ? '#484848' : '#fff' } />
                </Box>
            </Box>
            <Box style={styles.detailWrapper}>
                <Box style={styles.detailHeader}>
                    <Text style={styles.dayText}>Day 1</Text>
                    <Text style={styles.dateText}>04/02 (六)</Text>
                </Box>
                <Box style={styles.detailContent}>
                    <Box style={styles.detailTime}>
                        <Text>11:00</Text>
                        <MaterialIcon name="restaurant" size={14} color={ colorMode === "dark" ? '#fff' : '#484848' } style={styles.detailType}/>
                    </Box>
                    <Box>
                        <Box style={styles.detailbox}>
                            <Box style={styles.planIndexBox}>
                                <Text style={styles.planIndex}>1</Text>
                            </Box>
                            <Text style={styles.planSightName}>阿妹茶樓</Text>
                            <Text>停留00時00分</Text>
                        </Box>
                    </Box>
                </Box>
                <Pressable
                    _dark={{ bg: "#E5E5E5"}}
                    _light={{ bg: "#969696"}}
                    style={styles.addPlanDetailBtn}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcon name="add" size={16} color={ colorMode === "dark" ? '#fff' : '#484848' } />
                    <Text style={styles.addPlanDetailBtnText}>新增</Text>
                </Pressable>
            </Box>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView(colorMode)}>
                    <Box style={styles.modalHeader}>
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
                            <Text style={styles.modalLabel}>行程名稱</Text>
                            <Box>
                                <Input 
                                    variant="underlined" placeholder="九份一日遊" size="md" minWidth="75%" mt={1}
                                    isDisabled={true}
                                    style={styles.optionRight}
                                />
                            </Box>
                            
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text style={styles.modalLabel}>景點名稱</Text>
                            <Box>
                                <Input 
                                    variant="underlined" placeholder="輸入景點名稱" size="md" minWidth="75%" mt={1}
                                    value={sightName} onChangeText={text => setSightName(text)}
                                    style={styles.optionRight}
                                />
                            </Box>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text style={styles.modalLabel}>景點類別</Text>
                            <Box
                                _dark={{ bg: "#C4C4C4"}}
                                _light={{ bg: "#E5E5E5"}}
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
                            <Text style={styles.modalLabel}>加入天數</Text>
                            <Pressable
                                _dark={{ bg: "#C4C4C4"}}
                                _light={{ bg: "#E5E5E5"}}
                                style={styles.optionSelectBox}
                                onPress={null}
                            >
                                <Text style={{color: '#969696'}}>Day 1</Text>
                            </Pressable>
                        </Box>
                        <Box style={styles.optionWrapper}>
                            <Text style={styles.modalLabel}>停留時間</Text>
                            <Pressable
                                _dark={{ bg: "#C4C4C4"}}
                                _light={{ bg: "#E5E5E5"}}
                                style={styles.optionSelectBox}
                                onPress={()=> setStayModalVisible(!stayModalVisible)}
                            >
                                <Text>{stayTime.hours}時{stayTime.minutes}分</Text>
                            </Pressable>
                        </Box>
                    </Box>
                    <Pressable
                        _dark={{ bg: "#C4C4C4"}}
                        _light={{ bg: "#C4C4C4"}}
                        style={styles.nextBtn}
                        onPress={()=> handleFinished()}
                    >
                        <Text>完成</Text>
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    introWrapper: {
        marginLeft: 12,
    },
    introImage: {
        width: 172,
        height: 95,
        borderRadius: 5,
        backgroundColor: '#969696',
    },
    introName: {
        fontSize: 14,
        fontWeight: '500',
    },
    introDate: {
        fontSize: 14,
        color: '#969696',
    },
    ownerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#969696',
        marginTop: 10,
    },
    dayWrapper: {
        width: '100%',
        height: 36,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    dayBox: {
        width: 45,
        marginHorizontal: 12,
    },
    dayBoxText: {
        fontSize: 14,
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
        borderLeftColor: '#C4C4C4',
    },
    planIndexBox: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
        left: -11,
    },
    planIndex: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 20,
    },
    planSightName: {
        fontSize: 16,
        fontWeight: '500',
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
    },
    modalView: (colorMode) => ({
        width: '100%',
        height: '95%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
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
        marginTop: 20,
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
    nextBtn: {
        width: 120,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
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