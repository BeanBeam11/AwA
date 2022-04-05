import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, Image } from 'react-native';
import { useColorMode, Box, Text, Pressable, Input } from 'native-base';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PlannerScreen = () => {
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
                <Box flex={1}
                    _dark={{ bg: "#484848" }}
                    _light={{ bg: "#fff" }}
                >
                    <Text>我的行程</Text>
                </Box>
           )
        }else if (selectedIndex == 1) {
           return (
              <Box flex={1}
                _dark={{ bg: "#484848" }}
                _light={{ bg: "#fff" }}
            >
                <Text>共用行程</Text>
            </Box>
           )
        }else if (selectedIndex == 2) {
            return (
               <Box flex={1}
                 _dark={{ bg: "#484848" }}
                 _light={{ bg: "#fff" }}
             >
                 <Text>收藏行程</Text>
             </Box>
            )
         }
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
                            _light={{ bg: "#fff"}}
                            style={styles.nextBtn}
                            onPress={() => setModalVisible(!modalVisible)}
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
});