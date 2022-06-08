import React from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';
import { formatDate } from '../utils/formatter';

const MyPlan = ({ navigation, item }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Pressable
            style={[
                styles.planBox,
                {
                    width: Dimensions.get('window').width * 0.45,
                },
            ]}
            _dark={{ bg: colors.dark[100] }}
            _light={{ bg: '#fff' }}
            onPress={() => navigation.navigate('PlanDetailScreen', { planName: item.name })}
        >
            <Box style={styles.planImageBox}>
                <Image
                    style={[
                        styles.planImage,
                        {
                            width: Dimensions.get('window').width * 0.45 - 20,
                        },
                    ]}
                    source={{ uri: item.cover_image }}
                    resizeMode="cover"
                />
            </Box>
            <Text style={styles.planName} color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                {item.name}
            </Text>
            <Text style={styles.planDate} color={colors.dark[300]}>
                {formatDate(item.start_date)} - {formatDate(item.end_date)}
            </Text>
            <Pressable _dark={{ bg: '#fff' }} _light={{ bg: '#fff' }} style={styles.ownerAvatar} onPress={null}>
                <Image source={{ uri: item.owner_image }} style={styles.ownerImage} resizeMode="cover" />
            </Pressable>
        </Pressable>
    );
};

export { MyPlan };

const styles = StyleSheet.create({
    planBox: {
        height: 200,
        borderRadius: 5,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 10,
    },
    planImageBox: {
        marginBottom: Platform.OS === 'ios' ? 8 : 5,
    },
    planImage: {
        height: 92,
        borderRadius: 5,
    },
    planName: {
        fontSize: 14,
        fontWeight: '500',
    },
    planDate: {
        fontSize: Platform.OS === 'ios' ? 11 : 10,
        lineHeight: Platform.OS === 'ios' ? 18 : 16,
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
