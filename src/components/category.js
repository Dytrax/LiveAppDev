import React, {Component} from 'react'
import {View,StyleSheet,Text,Platform} from 'react-native'
import Circle from './circle';


class CategoryMaker extends Component {
    render(){
        return(
            <View style={styles.categoryMakerContainer}>
                <View style={styles.circleContainer}>
                    <Circle img={this.props.img}/>
                </View>
                <Text numberOfLines={2} style={styles.categoryTitle}>{this.props.title}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    categoryMakerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:15,
    },
    categoryTitle:{
        //fontFamily: Platform.OS === 'ios' ? 'Kailasa' : 'sans-serif',
        fontSize: 13,
        fontWeight:'200',
        color:'#fff',
        fontWeight:'500'
        //width:50,
        //textAlign: 'justify',
    },
    circleContainer:{
        marginBottom:5
    }
})
export default CategoryMaker;
