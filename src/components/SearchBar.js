import React, { useState } from 'react';
import { StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';

const SearchBar = (props) => {
    const { navigation, style, placeholderText } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [keyword, setKeyword] = useState('');

    return (
        <Box
            style={[styles.searchBar, style, { width: Dimensions.get('window').width - 48 }]}
            _dark={{ bg: colors.dark[200] }}
            _light={{ bg: '#fff' }}
        >
            <Image source={require('../../assets/icons/ic_search.png')} style={styles.searchIcon} resizeMode="cover" />
            <TextInput
                placeholder={placeholderText}
                placeholderTextColor={colors.dark[400]}
                onChangeText={(text) => setKeyword(text)}
                value={keyword}
                returnKeyType="search"
                style={{ width: '100%' }}
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
