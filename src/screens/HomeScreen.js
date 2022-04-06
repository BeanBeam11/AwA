import React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { useColorMode, Box, Text, Pressable} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import sightData from '../json/recommendSight';
import myPlanData from '../json/myPlan';
import { MyPlan } from '../components/MyPlan';

const HomeScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();

    const renderItem = ({ item }) =>{
        return (
            <Box style={styles.sightBox}>
                <Box style={styles.sightImageBox}>
                    <Image source={{uri: item.Picture1}} style={styles.sightImage} resizeMode="cover" />
                </Box>
                <Text style={styles.sightName}>{item.Name}</Text>
                <Text style={styles.sightLocation}>{item.Region}・{item.Town}</Text>
                <Pressable 
                    _dark={{ bg: "#fff"}}
                    _light={{ bg: "#C4C4C4"}}
                    style={styles.addSightBtn}
                    onPress={null}
                >
                    <MaterialIcon name="add" size={20} color={ colorMode === "dark" ? '#484848' : '#fff' } />
                </Pressable>
            </Box>
        );
    }

    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <Box style={styles.sectionWrapper}>
                <Box style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>景點推薦</Text>
                    <Pressable style={styles.sectionRightBox}>
                        <Text style={styles.sectionTitleRight}>查看全部</Text>
                    </Pressable>
                </Box>
                <FlatList
                    data={sightData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </Box>
            <Box style={styles.sectionWrapper}>
                <Box style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>推薦行程</Text>
                    <Pressable style={styles.sectionRightBox}>
                        <Text style={styles.sectionTitleRight}>查看全部</Text>
                    </Pressable>
                </Box>
                <FlatList
                    data={myPlanData}
                    renderItem={({item})=> <MyPlan item={item} navigation={navigation} />}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </Box>
            <Box style={styles.sectionWrapper}>
                <Box style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>最新消息</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionWrapper: {
        marginBottom: 10,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    sectionRightBox: {
        marginLeft: 'auto',
    },
    sectionTitleRight: {
        fontSize: 14,
        fontWeight: '600',
    },
    sightBox: {
        width: 188,
        height: 215,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginRight: 10,
        padding: 12,
    },
    sightImageBox: {
        marginBottom: 8,
    },
    sightImage: {
        width: 164,
        height: 120,
        borderRadius: 5,
    },
    sightName: {
        fontSize: 14,
        fontWeight: '500',
    },
    sightLocation: {
        fontSize: 11,
        color: '#969696',
    },
    addSightBtn: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 15,
        right: 12,
    }
});