import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable} from 'native-base';

const News = (props) => {
    const {navigation, style} = props;
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    
    return (
        <Pressable
            style={[
                styles.newsBox,
                style,
                {width: Dimensions.get('window').width - 48}
            ]}
            _dark={{ bg: colors.dark[100]}}
            _light={{ bg: '#fff'}}
            onPress={null}
        >
            <Text
                color={colorMode === "dark" ? colors.dark[600] : colors.dark[300]}
            >- Coming Soon -</Text>
        </Pressable>
    );
}

export { News };

const styles = StyleSheet.create({
    newsBox: {
        height: 180,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});