import React from 'react';
import { FlatList } from 'react-native';
import { City } from './City';
import { cities } from '../data/cities';

const CityList = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return <City item={item} navigation={navigation} />;
    };

    return (
        <FlatList
            data={cities}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
        />
    );
};

export { CityList };
