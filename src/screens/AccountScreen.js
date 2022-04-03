import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

const AccountScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.avatarBox}>
                <Image src={null} />
            </View>
            <Text style={styles.name}>暱稱</Text>
            <View style={styles.profileWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.text}>旅遊類型</Text>
                    </View>
                    <Text style={styles.text}>美食</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.text}>交通方式</Text>
                    </View>
                    <Text style={styles.text}>公車</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.text}>性別</Text>
                    </View>
                    <Text style={styles.text}>女</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.text}>年齡</Text>
                    </View>
                    <Text style={styles.text}>19-25</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.text}>興趣</Text>
                    </View>
                    <Text style={styles.text}>吃飯、睡覺、打東東</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editBtnText}>編輯</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    avatarBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#484848',
        marginTop: 45,
    },
    name: {
        fontSize: 20,
        color: '#484848',
        marginTop: 15,
    },
    profileWrapper: {
        width: '100%',
        marginTop: 50,
        paddingLeft: 30,
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    labelWrapper: {
        width: 80,
        paddingRight: 8,
        marginRight: 15,
        marginBottom: 15,
        borderRightWidth: 1,
        borderRightColor: '#484848',
    },
    text: {
        fontSize: 14,
        color: '#484848',
        textAlign: 'right',
    },
    editBtn: {
        width: 120,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#484848',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    editBtnText: {
        fontSize: 14,
        color: '#fff',
    }
});