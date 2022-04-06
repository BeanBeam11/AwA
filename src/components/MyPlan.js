import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useColorMode, Box, Text, Pressable} from 'native-base';

const MyPlan = ({navigation, item}) => {
    const { colorMode } = useColorMode();

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
                <Image source={{uri: item.owner_image}} style={styles.ownerImage} resizeMode="cover" />
            </Pressable>
        </Pressable>
    );
}

export { MyPlan };

const styles = StyleSheet.create({
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
    ownerImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
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