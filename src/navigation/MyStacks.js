import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SearchRegionScreen from '../screens/SearchRegionScreen';
import RegionScreen from '../screens/RegionScreen';
import RecommendSightScreen from '../screens/RecommendSightScreen';
import SightScreen from '../screens/SightScreen';
import PlanListScreen from '../screens/PlanListScreen';
import SearchScreen from '../screens/SearchScreen';
import PlannerScreen from '../screens/PlannerScreen';
import PlanDetailScreen from '../screens/PlanDetailScreen';
import ShareScreen from '../screens/ShareScreen';
import AccountScreen from '../screens/AccountScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchRegionScreen" component={SearchRegionScreen} />
            <Stack.Screen name="RegionScreen" component={RegionScreen} />
            <Stack.Screen name="RecommendSightScreen" component={RecommendSightScreen} />
            <Stack.Screen name="SightScreen" component={SightScreen} />
            <Stack.Screen name="PlanListScreen" component={PlanListScreen} />
        </Stack.Navigator>
    );
};

export const SearchStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    );
};

export const PlannerStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="PlannerScreen" component={PlannerScreen} />
            <Stack.Screen name="PlanDetailScreen" component={PlanDetailScreen} />
        </Stack.Navigator>
    );
};

export const ShareStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ShareScreen" component={ShareScreen} />
        </Stack.Navigator>
    );
};

export const AccountStack = () => {
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
                name="ProfileEditScreen"
                component={ProfileEditScreen}
                options={({ navigation }) => ({
                    presentation: 'fullScreenModal',
                })}
            />
        </Stack.Navigator>
    );
};
