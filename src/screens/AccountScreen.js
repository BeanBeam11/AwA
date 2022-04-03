import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useColorMode, Box, Text} from 'native-base';

const AccountScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <Box style={styles.avatarBox}>
                <Image src={null} />
            </Box>
            <Text style={styles.name}>暱稱</Text>
            <Box style={styles.profileWrapper}>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>旅遊類型</Text>
                    </Box>
                    <Text style={styles.text}>美食</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>交通方式</Text>
                    </Box>
                    <Text style={styles.text}>公車</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>性別</Text>
                    </Box>
                    <Text style={styles.text}>女</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>年齡</Text>
                    </Box>
                    <Text style={styles.text}>19-25</Text>
                </Box>
                <Box style={styles.contentWrapper}>
                    <Box style={styles.labelWrapper(colorMode)}>
                        <Text style={styles.text}>興趣</Text>
                    </Box>
                    <Text style={styles.text}>吃飯、睡覺、打東東</Text>
                </Box>
            </Box>
            <TouchableOpacity style={styles.editBtn} onPress={()=> navigation.navigate('ProfileEditScreen')}>
                <Text style={styles.editBtnText}>編輯</Text>
            </TouchableOpacity>
        </Box>
    );
}

export default AccountScreen;

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
        paddingLeft: 30,
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
    editBtn: {
        width: 120,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#969696',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    editBtnText: {
        fontSize: 14,
    }
});