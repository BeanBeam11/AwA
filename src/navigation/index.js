import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { MyTheme } from '../theme';
import { MyTabs } from './MyTabs';

import AuthScreen from '../screens/AuthScreen';
import { selectLogin } from '../redux/accountSlice';

const Navigation = () => {
    const login = useSelector(selectLogin);

    return <NavigationContainer theme={MyTheme}>{!login.hasLogin ? <AuthScreen /> : <MyTabs />}</NavigationContainer>;
};

export default Navigation;
