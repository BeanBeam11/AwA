import React from 'react';
import { FlatList } from 'react-native';
import { Sight } from './Sight';
import { Sight_H } from './Sight_H';

const SightList = ({ navigation, data }) => {
    const renderItem = ({ item }) => {
        return <Sight item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            initialNumToRender={5}
        />
    );
};

const SightList_V = ({ navigation, data }) => {
    const renderItem = ({ item }) => {
        return <Sight_H item={item} navigation={navigation} style={{ marginBottom: 10 }} />;
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
        />
    );
};

export { SightList, SightList_V };
