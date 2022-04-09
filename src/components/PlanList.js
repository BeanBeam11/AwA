import React from 'react';
import { FlatList } from 'react-native';
import { Plan } from './Plan';
import planData from '../json/myPlan';

const PlanList = ({navigation}) => {

    const renderItem = ({ item }) =>{
        return (
            <Plan item={item} navigation={navigation} />
        );
    }
    
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
}

export { PlanList };