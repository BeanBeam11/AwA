import React, { useState } from 'react';
import { StyleSheet, Image, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MyTheme } from '../theme';
import { useColorMode } from 'native-base';
import { theme } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PlannerScreen from '../screens/PlannerScreen';
import PlanDetailScreen from '../screens/PlanDetailScreen';
import ShareScreen from '../screens/ShareScreen';
import AccountScreen from '../screens/AccountScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
      <NavigationContainer theme={MyTheme}>
        <TabNavigator />
      </NavigationContainer>
    );
}

const HomeStackNavigator = () => {
    const { colorMode } = useColorMode();
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
      >
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
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
                headerShown: false,
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
            headerShown: false,
        }}
      >
        <Stack.Screen
            name="PlannerScreen"
            component={PlannerScreen}
        />
        <Stack.Screen
            name="PlanDetailScreen"
            component={PlanDetailScreen}
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
            headerShown: false,
        }}
      >
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
            name="ProfileEditScreen" component={ProfileEditScreen}
            options={({ navigation }) => ({
                presentation: 'fullScreenModal',
            })}
        />
      </Stack.Navigator>
    );
}

const TabNavigator = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                        if(iconName = focused){
                            return <Image source={require('../../assets/icons/ic_home_actived.png')} style={styles.navIcon} />
                        }else{
                            return(
                                colorMode === 'dark'
                                ? <Image source={require('../../assets/icons/ic_home_dark.png')} style={styles.navIcon} />
                                : <Image source={require('../../assets/icons/ic_home.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Search') {
                        if(iconName = focused){
                            return <Image source={require('../../assets/icons/ic_map_actived.png')} style={styles.navIcon} />
                        }else{
                            return(
                                colorMode === 'dark'
                                ? <Image source={require('../../assets/icons/ic_map_dark.png')} style={styles.navIcon} />
                                : <Image source={require('../../assets/icons/ic_map.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Planner') {
                        if(iconName = focused){
                            return <Image source={require('../../assets/icons/ic_planner_actived.png')} style={styles.navIcon} />
                        }else{
                            return(
                                colorMode === 'dark'
                                ? <Image source={require('../../assets/icons/ic_planner_dark.png')} style={styles.navIcon} />
                                : <Image source={require('../../assets/icons/ic_planner.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Share') {
                        if(iconName = focused){
                            return <Image source={require('../../assets/icons/ic_share_actived.png')} style={styles.navIcon} />
                        }else{
                            return(
                                colorMode === 'dark'
                                ? <Image source={require('../../assets/icons/ic_share_dark.png')} style={styles.navIcon} />
                                : <Image source={require('../../assets/icons/ic_share.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Account') {
                        if(iconName = focused){
                            return <Image source={require('../../assets/icons/ic_account_actived.png')} style={styles.navIcon} />
                        }else{
                            return(
                                colorMode === 'dark'
                                ? <Image source={require('../../assets/icons/ic_account_dark.png')} style={styles.navIcon} />
                                : <Image source={require('../../assets/icons/ic_account.png')} style={styles.navIcon} />
                            );
                        }
                    }

                    return iconName;
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colorMode == 'dark' ? colors.dark100 : '#fff',
                    borderTopWidth: 0,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Planner" component={PlannerStackNavigator} />
            <Tab.Screen name="Share" component={ShareStackNavigator} />
            <Tab.Screen
                name="Account" component={AccountStackNavigator}
                options={({ navigation }) => ({
                    tabBarStyle: { display: 'none' }
                })}
            />
      </Tab.Navigator>
    );
}

export default Navigation;

const styles = StyleSheet.create({
    navIcon: {
        width: 24,
        height: 24,
    },
});