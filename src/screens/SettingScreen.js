import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useColorMode, Switch, Box, Text } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const SettingScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <Box style={styles.optionBox}>
                <Text style={styles.optionText}>深色模式</Text>
                <Switch
                    size="sm"
                    isChecked={colorMode === "dark"}
                    onToggle={toggleColorMode}
                    style={{ marginLeft: 'auto' }}
                />
            </Box>
            <TouchableOpacity style={styles.optionBox}>
                <Text>意見回饋</Text>
                <MaterialIcon name="arrow-forward-ios" size={18} color="#484848" style={styles.optionIcon(colorMode)}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBox}>
                <Text>服務條款</Text>
                <MaterialIcon name="arrow-forward-ios" size={18} color="#484848" style={styles.optionIcon(colorMode)}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBox}>
                <Text>隱私聲明</Text>
                <MaterialIcon name="arrow-forward-ios" size={18} color="#484848" style={styles.optionIcon(colorMode)}/>
            </TouchableOpacity>
        </Box>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    optionBox: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    optionText: {
        fontSize: 14,
    },
    optionIcon: (colorMode) => ({
        marginLeft: 'auto',
        color: colorMode === "dark" ? '#fff' : '#484848',
    }),
});