import React, {Component} from 'react'
import {View,StyleSheet,Text,Platform} from 'react-native'
import Square from './Square';


class CategoryEvents extends Component {
    render(){
        return(
            <View style={styles.categoryMakerContainer}>
                <View style={styles.circleContainer}>
                    <Square img={this.props.img}/>
                </View>
                <Text numberOfLines={2} style={styles.categoryTitle}>{this.props.title}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    categoryMakerContainer:{
        width: '100%', 
        height: 120, 
        //justifyContent: 'center',
        //alignItems: 'center',
        
    },
    categoryTitle:{
        //fontFamily: Platform.OS === 'ios' ? 'Kailasa' : 'sans-serif',
        position:'absolute',
        bottom:100,
        //top: 20,
        alignSelf: 'center',
        fontSize: 30,
        fontWeight:'200',
        color:'rgb(241,139,81)',
        fontWeight:'bold',
        //width:50,
        //textAlign: 'justify',
    },
    circleContainer:{
        //marginBottom:5
        overflow: "hidden",
    }
})
export default CategoryEvents;
