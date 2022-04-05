import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useColorMode, Box, Text, Pressable } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const PlanDetailScreen = () => {
    const { colorMode } = useColorMode();
    
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
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
                    <Text style={styles.dayText}>Day 1</Text>
                </Box>
                <Box style={styles.dayBox}>
                    <Text style={styles.dayText}>Day 2</Text>
                </Box>
                <Box style={styles.dayBox}>
                    <Text style={styles.dayText}>Day 3</Text>
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
                            <Text>阿妹茶樓</Text>
                            <Text>停留00時00分</Text>
                        </Box>
                    </Box>
                </Box>
                <Pressable
                    _dark={{ bg: "#E5E5E5"}}
                    _light={{ bg: "#969696"}}
                    style={styles.addPlanDetailBtn}
                    onPress={null}
                >
                    <MaterialIcon name="add" size={16} color={ colorMode === "dark" ? '#fff' : '#484848' } />
                    <Text style={styles.addPlanDetailBtnText}>新增</Text>
                </Pressable>
            </Box>
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
    dayText: {
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
        paddingLeft: 18,
        paddingBottom: 20,
        borderLeftWidth: 1.5,
        borderLeftColor: '#C4C4C4',
    },
    planIndexBox: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
        left: -8.5,
    },
    planIndex: {
        fontSize: 10,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 16,
    },
    addPlanDetailBtn: {
        width: 66,
        height: 24,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    addPlanDetailBtnText: {
        fontSize: 12,
    },
});