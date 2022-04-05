import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, Image, FlatList } from 'react-native';
import { useColorMode, Box, Text, Pressable, Input } from 'native-base';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import myPlanData from '../json/myPlan.json';

const PlannerScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const SegmentedContent = () => {
        if(selectedIndex == 0) {
            return (
                <MyPlan />
            )
        }else if (selectedIndex == 1) {
            return (
                <SharedPlan />
            )
        }else if (selectedIndex == 2) {
            return (
                <SavedPlan />
            )
         }
    }

    const MyPlan = () => {
        const renderItem = ({ item }) =>{
            return (
                <Pressable style={styles.planBox} onPress={()=> navigation.navigate('PlanDetailScreen')}>
                    <Box style={styles.planImageBox}>
                        <Image source={{uri: item.cover_image}} style={styles.planImage} resizeMode="cover" />
                    </Box>
                    <Text style={styles.planName}>{item.name}</Text>
                    <Text style={styles.planDate}>{formatDate(item.start_date)} - {formatDate(item.end_date)}</Text>
                    <Pressable 
                        _dark={{ bg: "#fff"}}
                        _light={{ bg: "#C4C4C4"}}
                        style={styles.ownerAvatar}
                        onPress={null}
                    >
                        <Image source={{uri: null}} style={styles.ownerImage} resizeMode="cover" />
                    </Pressable>
                </Pressable>
            );
        }

        return(
            <Box 
                _dark={{ bg: "#484848" }}
                _light={{ bg: "#fff" }}
                style={styles.planWrapper}
            >
                <FlatList
                    data={myPlanData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                />
            </Box>
        );
    }

    const SharedPlan = () => {
        return(
            <Box 
                _dark={{ bg: "#484848" }}
                _light={{ bg: "#fff" }}
                style={styles.planWrapper}
            >
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無共用行程</Text>
                </Box>
            </Box>
        );
    }

    const SavedPlan = () => {
        return(
            <Box 
                _dark={{ bg: "#484848" }}
                _light={{ bg: "#fff" }}
                style={styles.planWrapper}
            >
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無收藏行程</Text>
                </Box>
            </Box>
        );
    }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleStartConfirm = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };
    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

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

    const handleNextStep = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('PlanDetailScreen');
    }

    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <SegmentedControl
                values={["我的行程", "共用行程", "收藏行程"]}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.segmentedControlStyle}
                fontStyle={{
                    fontSize: 14,
                    color: colorMode === "dark" ? '#fff' : '#484848',
                }}
                activeFontStyle={{
                    fontSize: 14,
                    color: '#484848',
                }}
                appearance="light" // to fix if device use dark mode
            />
            <SegmentedContent />
            <TouchableOpacity style={styles.fabWrapper} onPress={() => setModalVisible(true)}>
                <Box
                    _dark={{ bg: "#fff" }}
                    _light={{ bg: "#484848" }}
                    style={styles.fab(colorMode)}
                >
                    <MaterialIcon name="add" size={36} color={ colorMode === "dark" ? '#484848' : '#fff' } />
                </Box>
            </TouchableOpacity>

            <View>
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
                            <Text style={styles.modalHeaderText}>建立行程</Text>
                            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                                <MaterialIcon name="close" size={24} color={ colorMode === "dark" ? '#fff' : '#484848' }/>
                            </TouchableOpacity>
                        </Box>
                        <Box style={styles.modalContent}>
                            <Box style={styles.imageWrapper}>
                                <Image src={null} style={styles.image} />
                            </Box>
                            <Text style={styles.modalLabel}>行程名稱</Text>
                            <Input 
                                variant="outline" placeholder="行程名稱" size="md" minWidth="85%" mt={3}
                                value={title} onChangeText={text => setTitle(text)}
                            />
                            <Text style={styles.modalLabel}>日期</Text>
                            <Box style={styles.dateWrapper}>
                                <Pressable
                                    _dark={{ bg: "#C4C4C4"}}
                                    _light={{ bg: "#E5E5E5"}}
                                    style={styles.dateBox}
                                    onPress={showStartDatePicker}
                                >
                                    <Text>{formatDate(startDate)}</Text>
                                </Pressable>
                                <Box
                                    _dark={{ bg: "#C4C4C4"}}
                                    _light={{ bg: "#E5E5E5"}}
                                    style={styles.dateDivider}
                                ></Box>
                                <Pressable
                                    _dark={{ bg: "#C4C4C4"}}
                                    _light={{ bg: "#E5E5E5"}}
                                    style={styles.dateBox}
                                    onPress={showEndDatePicker}
                                >
                                    <Text>{formatDate(endDate)}</Text>
                                </Pressable>
                            </Box>
                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                onConfirm={handleStartConfirm}
                                onCancel={hideStartDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                onConfirm={handleEndConfirm}
                                onCancel={hideEndDatePicker}
                            />
                        </Box>
                        <Pressable
                            _dark={{ bg: "#C4C4C4"}}
                            _light={{ bg: "#C4C4C4"}}
                            style={styles.nextBtn}
                            onPress={()=> handleNextStep()}
                        >
                            <Text>下一步</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </Box>
    );
}

export default PlannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    segmentedControlStyle: {
        width: '80%',
        height: 32,
        marginTop: 10,
        marginBottom: 25,
    },
    fabWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fab: (colorMode) => ({
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colorMode === 'dark' ? "#fff" : "#484848",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8, //Android only
    }),
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
    imageWrapper: {
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        marginTop: 20,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
    },
    nextBtn: {
        width: 120,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    dateBox: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 5,
    },
    dateDivider: {
        width: 16,
        height: 2,
        marginHorizontal: 10,
    },
    planWrapper: {
        width: 340,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    planBox: {
        width: 165,
        height: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
    },
    planImageBox: {
        marginBottom: 8,
    },
    planImage: {
        width: 145,
        height: 92,
        borderRadius: 5,
    },
    planName: {
        fontSize: 14,
        fontWeight: '500',
    },
    planDate: {
        fontSize: 11,
        color: '#969696',
    },
    ownerAvatar: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 12,
        right: 10,
    },
    planNullBox: {
        flex: 1,
        minHeight: 500,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planNullText: {
        fontSize: 16,
        color: '#969696',
    },
});