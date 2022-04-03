import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, Box, Text} from 'native-base';

const ShareScreen = () => {
    return(
        <Box
            style={styles.container}
            _dark={{ bg: "#484848"}}
            _light={{ bg: "#fff"}}
        >
            <Text>Share</Text>
        </Box>
    );
}

export default ShareScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});