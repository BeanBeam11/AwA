import React from 'react';
import { FlatList } from 'react-native';
import { Plan } from './Plan';
import { Plan_H } from './Plan_H';
import planData from '../json/myPlan';

const PlanList = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return <Plan item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={planData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
        />
    );
};

const PlanList_V = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return <Plan_H item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={planData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 15, paddingbottom: 200 }}
        />
    );
};

export { PlanList, PlanList_V };
