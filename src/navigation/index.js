import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MyTheme } from '../theme';
import { MyTabs } from './MyTabs';

const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <MyTabs />
        </NavigationContainer>
    );
};

export default Navigation;
