import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PlannerScreen from '../screens/PlannerScreen';
import ShareScreen from '../screens/ShareScreen';
import AccountScreen from '../screens/AccountScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
}

const HomeStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            // headerShadowVisible: false,
            // title: '',
        }}
      >
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
                headerTitle: '首頁',
                headerTintColor: '#484848',
                headerTitleStyle: {
                    fontWeight: '500',
                },
                headerRight: () => (
                    <TouchableOpacity onPress={null}>
                        <MaterialIcon name="notifications" size={24} color="#484848" />
                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            headerShadowVisible: false,
            title: '',
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
    return (
      <Stack.Navigator
        screenOptions={{
            // headerShadowVisible: false,
            // title: '',
        }}
      >
        <Stack.Screen
            name="PlannerScreen"
            component={PlannerScreen}
            options={({ navigation }) => ({
                headerTitle: '行程',
                headerTintColor: '#484848',
                headerTitleStyle: {
                    fontWeight: '500',
                },
                headerRight: () => (
                    <TouchableOpacity onPress={null}>
                        <Text>編輯</Text>
                    </TouchableOpacity>
                ),
            })}
        />
      </Stack.Navigator>
    );
}

const ShareStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
            // headerShadowVisible: false,
            // title: '',
        }}
      >
        <Stack.Screen
            name="ShareScreen"
            component={ShareScreen}
            options={({ navigation }) => ({
                headerTitle: '共享',
                headerTintColor: '#484848',
                headerTitleStyle: {
                    fontWeight: '500',
                },
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
    return (
      <Stack.Navigator
        screenOptions={{
            // headerShadowVisible: false,
            // title: '',
        }}
      >
        <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={({ navigation }) => ({
                headerTitle: '個人資訊',
                headerTintColor: '#484848',
                headerTitleStyle: {
                    fontWeight: '500',
                },
                headerRight: () => (
                    <TouchableOpacity onPress={()=> navigation.navigate('SettingScreen')}>
                        <MaterialIcon name="settings" size={24} color="#484848" />
                    </TouchableOpacity>
                ),
            })}
        />
        <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={({ navigation }) => ({
                headerTitle: '設定',
                headerTintColor: '#484848',
                headerTitleStyle: {
                    fontWeight: '500',
                },
                headerBackTitleVisible: false,
            })}
        />
      </Stack.Navigator>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = focused
                    ? <MaterialIcon name="home" size={24} color="#484848" />
                    : <MaterialIcon name="home" size={24} color="#C4C4C4" />
                } else if (route.name === 'Search') {
                    iconName = focused
                    ? <MaterialIcon name="search" size={24} color="#484848" />
                    : <MaterialIcon name="search" size={24} color="#C4C4C4" />
                } else if (route.name === 'Planner') {
                    iconName = focused
                    ? <MaterialIcon name="note" size={24} color="#484848" />
                    : <MaterialIcon name="note" size={24} color="#C4C4C4" />
                } else if (route.name === 'Share') {
                    iconName = focused
                    ? <MaterialIcon name="group" size={24} color="#484848" />
                    : <MaterialIcon name="group" size={24} color="#C4C4C4" />
                } else if (route.name === 'Account') {
                    iconName = focused
                    ? <MaterialIcon name="account-circle" size={24} color="#484848" />
                    : <MaterialIcon name="account-circle" size={24} color="#C4C4C4" />
                }

                return iconName;
                },
                tabBarActiveTintColor: '#484848',
                tabBarInactiveTintColor: '#C4C4C4',
                headerShown: false,
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Planner" component={PlannerStackNavigator} />
            <Tab.Screen name="Share" component={ShareStackNavigator} />
            <Tab.Screen name="Account" component={AccountStackNavigator} />
      </Tab.Navigator>
    );
}

export default Navigation;