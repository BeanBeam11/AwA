import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, Box, Text} from 'native-base';

const SearchScreen = () => {
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <Text>Search</Text>
        </Box>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});