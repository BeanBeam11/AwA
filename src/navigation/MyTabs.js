import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorMode } from 'native-base';

import { HomeStack, SearchStack, PlannerStack, ShareStack, AccountStack } from './MyStacks';

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        if ((iconName = focused)) {
                            return (
                                <Image
                                    source={require('../../assets/icons/ic_home_actived.png')}
                                    style={styles.navIcon}
                                />
                            );
                        } else {
                            return colorMode === 'dark' ? (
                                <Image source={require('../../assets/icons/ic_home_dark.png')} style={styles.navIcon} />
                            ) : (
                                <Image source={require('../../assets/icons/ic_home.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Search') {
                        if ((iconName = focused)) {
                            return (
                                <Image
                                    source={require('../../assets/icons/ic_map_actived.png')}
                                    style={styles.navIcon}
                                />
                            );
                        } else {
                            return colorMode === 'dark' ? (
                                <Image source={require('../../assets/icons/ic_map_dark.png')} style={styles.navIcon} />
                            ) : (
                                <Image source={require('../../assets/icons/ic_map.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Planner') {
                        if ((iconName = focused)) {
                            return (
                                <Image
                                    source={require('../../assets/icons/ic_planner_actived.png')}
                                    style={styles.navIcon}
                                />
                            );
                        } else {
                            return colorMode === 'dark' ? (
                                <Image
                                    source={require('../../assets/icons/ic_planner_dark.png')}
                                    style={styles.navIcon}
                                />
                            ) : (
                                <Image source={require('../../assets/icons/ic_planner.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Share') {
                        if ((iconName = focused)) {
                            return (
                                <Image
                                    source={require('../../assets/icons/ic_share_actived.png')}
                                    style={styles.navIcon}
                                />
                            );
                        } else {
                            return colorMode === 'dark' ? (
                                <Image
                                    source={require('../../assets/icons/ic_share_dark.png')}
                                    style={styles.navIcon}
                                />
                            ) : (
                                <Image source={require('../../assets/icons/ic_share.png')} style={styles.navIcon} />
                            );
                        }
                    } else if (route.name === 'Account') {
                        if ((iconName = focused)) {
                            return (
                                <Image
                                    source={require('../../assets/icons/ic_account_actived.png')}
                                    style={styles.navIcon}
                                />
                            );
                        } else {
                            return colorMode === 'dark' ? (
                                <Image
                                    source={require('../../assets/icons/ic_account_dark.png')}
                                    style={styles.navIcon}
                                />
                            ) : (
                                <Image source={require('../../assets/icons/ic_account.png')} style={styles.navIcon} />
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
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Planner" component={PlannerStack} />
            <Tab.Screen name="Share" component={ShareStack} />
            <Tab.Screen name="Account" component={AccountStack} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    navIcon: {
        width: 24,
        height: 24,
    },
});
