import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorMode, Box, Text} from 'native-base';

const MyPlan = () => {
    const { colorMode } = useColorMode();
    
    return(
        <Box 
            flex={1}
            _dark={{ bg: "#484848" }}
            _light={{ bg: "#fff" }}
        >
            <Text>我的行程</Text>
        </Box>
    );
}

export { MyPlan };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});