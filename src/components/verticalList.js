import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CategoryEvent from './categoryEvents';
import imagenPrueba from '../assets/makeover.png'

const styles = StyleSheet.create({
    container: {
        flex:1,
        //height:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const VerticalListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                //keyExtractor={(itemList)=>itemList.id.toString()}
                //horizontal={true}
                data={itemList}
                renderItem={({ item }) => <CategoryEvent
                    img={item.image_url}
                    title={item.title}
                />}
            />

    </View>
);

export default VerticalListView;
