import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, useTheme, Pressable} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AddButton = (props) => {
    const {navigation, size, style, onPress} = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    
    return (
        size === 'small' ? (
            <Pressable
                style={[
                    styles.smallBtn,
                    style,
                    {backgroundColor: colors.primary[100]}
                ]}
                onPress={onPress}
            >
                <MaterialIcon name="add" size={18} color={ colorMode === "dark" ? colors.dark[200] : '#fff' } />
            </Pressable>
        ) : (
            <Pressable
                style={[
                    styles.largeBtn,
                    style,
                    {backgroundColor: colors.primary[100]}
                ]}
                onPress={onPress}
            >
                <MaterialIcon name="add" size={36} color={ colorMode === "dark" ? colors.dark[200] : '#fff' } />
            </Pressable>
        )
        
    );
}

export { AddButton };

const styles = StyleSheet.create({
    smallBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});