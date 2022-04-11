import React from 'react';
import { useSelector } from "react-redux";
import { StyleSheet, Image, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable} from 'native-base';
import { GoBackHeader } from '../components/Header';
import { ActionButton } from '../components/ActionButton';

const ProfileScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const { info } = useSelector((state) => state.profile);
    const { avatar, name, interest, type, transportation, gender, age } = info;

    return(
        <Box
            style={styles.container}
            _dark={{ bg: colors.dark[50]}}
            _light={{ bg: colors.dark[600]}}
        >
            <GoBackHeader title={'個人檔案'} navigation={navigation}/>
            <Image source={{uri: "https://pbs.twimg.com/media/Eon8PXAVgAA9QO9?format=jpg&name=large"}} style={styles.avatarBox}/>
            <Text style={styles.name}>{name}</Text>
            <Box
                style={[styles.profileWrapper,{width: Dimensions.get('window').width - 48}]}
                _dark={{ bg: colors.dark[100]}}
                _light={{ bg: '#fff'}}
            >
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>旅遊類型</Text>
                    </Box>
                    <Text style={styles.text}>{type}</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>交通方式</Text>
                    </Box>
                    <Text style={styles.text}>{transportation}</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>性別</Text>
                    </Box>
                    <Text style={styles.text}>{gender}</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>年齡</Text>
                    </Box>
                    <Text style={styles.text}>{age}</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>興趣</Text>
                    </Box>
                    <Text style={styles.text}>{interest}</Text>
                </Box>
            </Box>
            <Pressable style={{marginTop: 80}} onPress={()=> navigation.navigate('ProfileEditScreen')}>
                <ActionButton text={'編輯'} />
            </Pressable>
        </Box>
    );
}

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
        marginTop: 45,
    },
    name: {
        fontSize: 20,
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
    labelWrapper: (colorMode) => ({
        width: 80,
        paddingRight: 8,
        marginRight: 15,
        marginBottom: 15,
        borderRightWidth: 1,
        borderRightColor: colorMode === "dark" ? '#fff' : '#484848',
    }),
    text: {
        fontSize: 14,
        textAlign: 'right',
    },
});