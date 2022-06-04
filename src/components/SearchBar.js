import React from 'react';
import { StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';

const SearchBar = (props) => {
    const { navigation, style, placeholder, onChangeText, value, onPressIn } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    return (
        <Box
            style={[styles.searchBar, { width: Dimensions.get('window').width - 48 }, style]}
            _dark={{ bg: colors.dark[200] }}
            _light={{ bg: '#fff' }}
        >
            <Image source={require('../../assets/icons/ic_search.png')} style={styles.searchIcon} resizeMode="cover" />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.dark[400]}
                onChangeText={onChangeText}
                value={value}
                returnKeyType="search"
                style={{ width: '100%' }}
                onPressIn={onPressIn}
            />
        </Box>
    );
};

export { SearchBar };

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        marginHorizontal: 24,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
});
