import React from 'react';
import { FlatList, View } from 'react-native';
import { Plan } from './Plan';
import { Plan_H } from './Plan_H';

const PlanList = ({ navigation, data }) => {
    const filteredData = data.filter((el) => el.trips[0].length !== 0);

    const renderItem = ({ item }) => {
        return <Plan item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
        />
    );
};

const PlanList_V = ({ navigation, data }) => {
    const filteredData = data.filter((el) => el.trips[0].length !== 0);

    const renderItem = ({ item }) => {
        return <Plan_H item={item} navigation={navigation} />;
    };

    const renderListFooter = () => <View style={{ width: '100%', height: 80 }}></View>;

    return (
        <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 15 }}
            ListFooterComponent={renderListFooter}
        />
    );
};

export { PlanList, PlanList_V };
