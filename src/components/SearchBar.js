import React, { useState } from 'react';
import { StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable } from 'native-base';

const SearchBar = (props) => {
    const { style, placeholder, onChangeText, value, editable, onPressIn, onSubmitEditing, autoFocus } = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Box style={styles.searchBarWrapper}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.dark[400]}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                onChangeText={onChangeText}
                value={value}
                maxLength={20}
                returnKeyType="search"
                style={[
                    styles.searchBar,
                    {
                        width: Dimensions.get('window').width - 48,
                        backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
                        color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                    },
                    isFocused && { borderWidth: 1.2, borderColor: colors.primary[100] },
                    style,
                ]}
                editable={editable}
                onPressIn={onPressIn}
                onSubmitEditing={onSubmitEditing}
                autoFocus={autoFocus}
            />
            <Image source={require('../../assets/icons/ic_search.png')} style={styles.searchIcon} resizeMode="cover" />
        </Box>
    );
};

export { SearchBar };

const styles = StyleSheet.create({
    searchBarWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
    },
    searchBar: {
        height: 40,
        borderRadius: 5,
        paddingLeft: 40,
        paddingRight: 12,
    },
    searchIcon: {
        position: 'absolute',
        width: 24,
        height: 24,
        top: 8,
        left: 8,
    },
});
