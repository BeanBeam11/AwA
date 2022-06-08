import React from 'react';
import { FlatList } from 'react-native';
import { Sight } from './Sight';
import { Sight_H } from './Sight_H';
import sightData from '../json/recommendSight';

const SightList = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return <Sight item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={sightData.slice(0, 5)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            initialNumToRender={5}
        />
    );
};

const SightList_V = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return <Sight_H item={item} navigation={navigation} style={{ marginBottom: 10 }} />;
    };

    return (
        <FlatList
            data={sightData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
        />
    );
};

export { SightList, SightList_V };
