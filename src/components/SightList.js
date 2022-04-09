import React from 'react';
import { FlatList } from 'react-native';
import { Sight } from './Sight';
import sightData from '../json/recommendSight';

const SightList = ({navigation}) => {

    const renderItem = ({ item }) =>{
        return (
            <Sight item={item} navigation={navigation} />
        );
    }
    
    return (
        <FlatList
            data={sightData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
        />
    );
}

export { SightList };