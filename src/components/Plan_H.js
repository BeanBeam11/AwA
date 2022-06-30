import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Plan_H = ({ navigation, item }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const planDay1 = item.trips[0].map((el) => el.spot);

    return (
        <Pressable
            style={styles.planBox}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={() => navigation.navigate('PlanDetailScreen', { trip: item })}
        >
            <Box style={styles.planDay}>
                <MaterialCommunityIcons name="bookmark" size={40} color={colors.primary[200]} />
                <Text style={styles.dayText} color={colorMode === 'dark' ? colors.dark[200] : colors.dark[600]}>
                    {item.trips.length}
                </Text>
            </Box>
            <Box>
                <Box style={styles.planImageBox} _dark={{ bg: colors.dark[200] }} _light={{ bg: colors.dark[500] }}>
                    {item.cover_image ? (
                        <Image source={{ uri: item.cover_image }} style={styles.planImage} resizeMode="cover" />
                    ) : null}
                </Box>
                <Pressable style={styles.owner} onPress={null}>
                    <Image source={{ uri: item.owner.photo }} style={styles.ownerImage} resizeMode="cover" />
                    <Text style={styles.ownerName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                        {item.owner.name}
                    </Text>
                </Pressable>
            </Box>
            <Box style={styles.infoWrapper}>
                <Text style={styles.planName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    {item.name.length > 8 ? `${item.name.slice(0, 8)}...` : item.name}
                </Text>
                <Text style={styles.planDayTitle} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                    Day 1
                </Text>
                <Text style={styles.planDetail} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                    {planDay1[0].length > 11 ? `${planDay1[0].slice(0, 11)}...` : planDay1[0]}
                </Text>
                <Text style={styles.planDetail} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                    {planDay1[1].length > 11 ? `${planDay1[1].slice(0, 11)}...` : planDay1[1]}
                </Text>
                <Text style={styles.planDetail} color={colorMode === 'dark' ? colors.dark[400] : colors.dark[300]}>
                    ...
                </Text>
            </Box>
        </Pressable>
    );
};

export { Plan_H };

const styles = StyleSheet.create({
    planBox: {
        width: '100%',
        height: 144,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    planDay: {
        position: 'absolute',
        top: -8,
        right: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        position: 'absolute',
        fontSize: 16,
    },
    planImageBox: {
        width: 145,
        height: 92,
        borderRadius: 5,
        marginBottom: Platform.OS === 'ios' ? 8 : 5,
    },
    owner: {
        display: 'flex',
        flexDirection: 'row',
    },
    ownerImage: {
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ownerName: {
        fontSize: 14,
        marginLeft: 8,
    },
    planImage: {
        width: 145,
        height: 92,
        borderRadius: 5,
    },
    infoWrapper: {
        marginLeft: 12,
        paddingTop: 3,
    },
    planName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    ownerImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    planDayTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    planDetail: {
        fontSize: 12,
    },
});
