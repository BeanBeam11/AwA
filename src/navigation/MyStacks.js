import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SearchRegionScreen from '../screens/SearchRegionScreen';
import RegionScreen from '../screens/RegionScreen';
import CitySightScreen from '../screens/CitySightScreen';
import RecommendSightScreen from '../screens/RecommendSightScreen';
import SightScreen from '../screens/SightScreen';
import PlanListScreen from '../screens/PlanListScreen';
import MapScreen from '../screens/MapScreen';
import PlannerScreen from '../screens/PlannerScreen';
import PlanDetailScreen from '../screens/PlanDetailScreen';
import PlanDetailEditScreen from '../screens/PlanDetailEditScreen';
import ShareScreen from '../screens/ShareScreen';
import ShareSearchScreen from '../screens/ShareSearchScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
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
            <Stack.Screen name="CitySightScreen" component={CitySightScreen} />
            <Stack.Screen name="RecommendSightScreen" component={RecommendSightScreen} />
            <Stack.Screen name="SightScreen" component={SightScreen} />
            <Stack.Screen name="PlanListScreen" component={PlanListScreen} />
        </Stack.Navigator>
    );
};

export const MapStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MapScreen" component={MapScreen} />
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
            <Stack.Screen
                name="PlanDetailEditScreen"
                component={PlanDetailEditScreen}
                options={({ navigation }) => ({
                    presentation: 'fullScreenModal',
                })}
            />
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
            <Stack.Screen name="ShareSearchScreen" component={ShareSearchScreen} />
            <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
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
