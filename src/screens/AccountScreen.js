import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useColorMode, useTheme, Box, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoBackHeader } from '../components/Header';
import { ActionButton } from '../components/ActionButton';
import Loading from '../components/Loading';
import { selectUser } from '../redux/accountSlice';

const AccountScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { colors } = useTheme();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { email } = user;

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <GoBackHeader title={'帳號設定'} navigation={navigation} />
            <Box style={styles.contentWrapper}>
                <Box style={styles.optionWrapper}>
                    <Text style={styles.optionTitle}>電子郵件 Email</Text>
                    <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color={colors.dark[300]}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder={email}
                            placeholderTextColor={colors.dark[300]}
                            editable={false}
                            style={styles.input}
                        />
                    </Box>
                </Box>
                <Box style={styles.optionWrapper}>
                    <Text style={styles.optionTitle}>密碼 Password</Text>
                    <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={24}
                            color={colors.dark[300]}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={colors.dark[400]}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            returnKeyType="done"
                            secureTextEntry={true}
                            maxLength={30}
                            style={styles.input}
                        />
                    </Box>
                </Box>
                <Box style={styles.optionWrapper}>
                    <Text style={styles.optionTitle}>確認密碼 Confirm Password</Text>
                    <Box style={styles.inputBox} _dark={{ bg: colors.dark[100] }} _light={{ bg: '#fff' }}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={24}
                            color={colors.dark[300]}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={colors.dark[400]}
                            value={passwordConfirm}
                            onChangeText={(text) => setPasswordConfirm(text)}
                            returnKeyType="done"
                            secureTextEntry={true}
                            maxLength={30}
                            style={styles.input}
                        />
                    </Box>
                </Box>
            </Box>
            <ActionButton text={'更新'} style={{ marginTop: 80 }} onPress={null} />
            {loading && <Loading />}
        </Box>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentWrapper: {
        width: '100%',
        paddingHorizontal: 24,
        marginTop: 40,
    },
    optionWrapper: {
        marginBottom: 15,
    },
    optionTitle: {
        marginRight: 'auto',
        marginBottom: 10,
    },
    inputBox: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 5,
    },
    inputIcon: {
        marginHorizontal: 5,
    },
    input: {
        width: '100%',
        fontSize: 16,
    },
});
