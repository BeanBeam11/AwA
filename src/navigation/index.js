import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../theme';
import { useColorMode } from 'native-base';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PlannerScreen from '../screens/PlannerScreen';
import ShareScreen from '../screens/ShareScreen';
import AccountScreen from '../screens/AccountScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
      <NavigationContainer theme={CustomTheme}>
        <TabNavigator />
      </NavigationContainer>
    );
}

const HomeStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
            },
            headerTitleStyle: {
                color: colorMode == 'dark' ? '#fff' : '#484848',
                fontWeight: '500',
            },
        }}
      >
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
                headerTitle: '首頁',
                headerRight: () => (
                    <TouchableOpacity onPress={null}>
                        <MaterialIcon name="notifications" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' } />
                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerShadowVisible: false,
            title: '',
            headerStyle: {
                backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
            },
            headerTitleStyle: {
                color: colorMode == 'dark' ? '#fff' : '#484848',
                fontWeight: '500',
            },
        }}
      >
        <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={({ navigation }) => ({
                headerTitle: '',
                headerRight: () => (
                    <TouchableOpacity onPress={null}>

                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const PlannerStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
            },
            headerTitleStyle: {
                color: colorMode == 'dark' ? '#fff' : '#484848',
                fontWeight: '500',
            },
        }}
      >
        <Stack.Screen
            name="PlannerScreen"
            component={PlannerScreen}
            options={({ navigation }) => ({
                headerTitle: '行程',
                headerRight: () => (
                    <TouchableOpacity onPress={null}>
                        <Text style={{color: colorMode == 'dark' ? '#fff' : '#484848'}}>編輯</Text>
                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const ShareStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
            },
            headerTitleStyle: {
                color: colorMode == 'dark' ? '#fff' : '#484848',
                fontWeight: '500',
            },
        }}
      >
        <Stack.Screen
            name="ShareScreen"
            component={ShareScreen}
            options={({ navigation }) => ({
                headerTitle: '共享',
                headerRight: () => (
                    <TouchableOpacity onPress={null}>

                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const AccountStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
            },
            headerTitleStyle: {
                color: colorMode == 'dark' ? '#fff' : '#484848',
                fontWeight: '500',
            },
        }}
      >
        <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={({ navigation }) => ({
                headerTitle: '個人資訊',
                headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('SettingScreen')}>
                        <MaterialIcon name="settings" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' } />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={({ navigation }) => ({
                headerTitle: '設定',
                headerTintColor: colorMode == 'dark' ? '#fff' : '#484848',
                headerBackTitleVisible: false,
            })}
        />
        <Stack.Screen
            name="ProfileEditScreen"
            component={ProfileEditScreen}
            options={({ navigation }) => ({
                headerTitle: '編輯個人資訊',
                // presentation: 'fullScreenModal', //this will hide select
                animation: 'slide_from_bottom',
                headerLeft: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('AccountScreen')}>
                        <Text style={{ color: '#969696'}}>取消</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('AccountScreen')}>
                        <Text style={{color: colorMode == 'dark' ? '#fff' : '#484848'}}>完成</Text>
                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

function getTabBarVisibility(route) {
    const { colorMode } = useColorMode();
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Account';
    switch (routeName) {
        case 'ProfileEditScreen':
          return { display: 'none' };
        default:
          return { backgroundColor: colorMode == 'dark' ? '#484848' : '#fff' };
    }
}

const TabNavigator = () => {
    const { colorMode } = useColorMode();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                        iconName = focused
                        ? <MaterialIcon name="home" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' }/>
                        : <MaterialIcon name="home" size={24} color={ colorMode == 'dark' ? '#969696' : '#C4C4C4' }/>
                    } else if (route.name === 'Search') {
                        iconName = focused
                        ? <MaterialIcon name="search" size={24} color={ colorMode == 'dark' ?'#fff' : '#484848' }/>
                        : <MaterialIcon name="search" size={24} color={ colorMode == 'dark' ? '#969696' : '#C4C4C4' }/>
                    } else if (route.name === 'Planner') {
                        iconName = focused
                        ? <MaterialIcon name="note" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' }/>
                        : <MaterialIcon name="note" size={24} color={ colorMode == 'dark' ? '#969696' : '#C4C4C4' }/>
                    } else if (route.name === 'Share') {
                        iconName = focused
                        ? <MaterialIcon name="group" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' }/>
                        : <MaterialIcon name="group" size={24} color={ colorMode == 'dark' ? '#969696' : '#C4C4C4' }/>
                    } else if (route.name === 'Account') {
                        iconName = focused
                        ? <MaterialIcon name="account-circle" size={24} color={ colorMode == 'dark' ? '#fff' : '#484848' }/>
                        : <MaterialIcon name="account-circle" size={24} color={ colorMode == 'dark' ? '#969696' : '#C4C4C4' }/>
                    }

                    return iconName;
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colorMode == 'dark' ? '#484848' : '#fff',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Planner" component={PlannerStackNavigator} />
            <Tab.Screen name="Share" component={ShareStackNavigator} />
            <Tab.Screen 
                name="Account" component={AccountStackNavigator}
                options={({route})=>({
                    tabBarStyle: getTabBarVisibility(route),
                })}
            />
      </Tab.Navigator>
    );
}

export default Navigation;