import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CategoryMaker from './category';
import imagenPrueba from '../assets/makeover.png'

const styles = StyleSheet.create({
    container: {
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const CustomListview = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                //keyExtractor={(itemList)=>itemList.id.toString()}
                horizontal={true}
                data={itemList}
                renderItem={({ item }) => <CategoryMaker
                    img={item.image_url}
                    title={item.title}
                />}
            />

    </View>
);

export default CustomListview;
