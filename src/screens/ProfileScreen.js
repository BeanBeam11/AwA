import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Image, Dimensions, Platform, ScrollView } from 'react-native';
import { useColorMode, useTheme, Box, Text } from 'native-base';
import { ProfileSettingHeader } from '../components/Header';
import { ActionButton } from '../components/ActionButton';
import { selectUser, selectProfile } from '../redux/accountSlice';

const ProfileScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const user = useSelector(selectUser);
    const profile = useSelector(selectProfile);
    const { photo, name } = user;
    const { interest, type, transportation, gender, age } = profile;

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <ProfileSettingHeader navigation={navigation} onPress={() => navigation.navigate('SettingScreen')} />
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: photo }} style={styles.avatarBox} />
                <Text
                    style={[
                        styles.name,
                        {
                            color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                        },
                    ]}
                >
                    {name}
                </Text>
                <Box
                    style={[styles.profileWrapper, { width: Dimensions.get('window').width - 48 }]}
                    _dark={{ bg: colors.dark[100] }}
                    _light={{ bg: '#fff' }}
                >
                    <Box style={styles.contentWrapper}>
                        <Box
                            style={[
                                styles.labelWrapper,
                                {
                                    borderRightColor: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                    },
                                ]}
                            >
                                旅遊類型
                            </Text>
                        </Box>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            {type}
                        </Text>
                    </Box>
                    <Box style={styles.contentWrapper}>
                        <Box
                            style={[
                                styles.labelWrapper,
                                {
                                    borderRightColor: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                    },
                                ]}
                            >
                                交通方式
                            </Text>
                        </Box>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            {transportation}
                        </Text>
                    </Box>
                    <Box style={styles.contentWrapper}>
                        <Box
                            style={[
                                styles.labelWrapper,
                                {
                                    borderRightColor: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                    },
                                ]}
                            >
                                性別
                            </Text>
                        </Box>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            {gender}
                        </Text>
                    </Box>
                    <Box style={styles.contentWrapper}>
                        <Box
                            style={[
                                styles.labelWrapper,
                                {
                                    borderRightColor: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                    },
                                ]}
                            >
                                年齡
                            </Text>
                        </Box>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            {age}
                        </Text>
                    </Box>
                    <Box style={styles.contentWrapper}>
                        <Box
                            style={[
                                styles.labelWrapper,
                                {
                                    borderRightColor: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                    },
                                ]}
                            >
                                興趣
                            </Text>
                        </Box>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                },
                            ]}
                        >
                            {interest}
                        </Text>
                    </Box>
                </Box>
                <ActionButton
                    text={'編輯'}
                    style={{ marginTop: 60 }}
                    onPress={() => navigation.navigate('ProfileEditScreen')}
                />
            </ScrollView>
        </Box>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    avatarBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        marginTop: Platform.OS === 'ios' ? 45 : 20,
    },
    name: {
        fontSize: 20,
        lineHeight: 24,
        marginTop: 15,
    },
    profileWrapper: {
        width: '100%',
        marginTop: 50,
        paddingLeft: 15,
        paddingVertical: 45,
        borderRadius: 10,
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    labelWrapper: {
        width: 80,
        paddingRight: 8,
        marginRight: 15,
        marginBottom: 15,
        borderRightWidth: 1,
    },
    text: {
        fontSize: 14,
        textAlign: 'right',
    },
});
