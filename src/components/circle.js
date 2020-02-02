import React, {Component} from 'react'
import {Image,StyleSheet,View} from 'react-native'


class Circle extends Component {
    render(){
        return(
            <View>
               {/* <View style={styles.circleImgEffect}/>  */}
            <Image source={this.props.img} style={styles.circle} /> 
            </View>
            
        )
    }
}


const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        //resizeMode:'contain',
        overflow: "hidden",
        alignSelf: 'center',
    }
        ,
    circleImgEffect:{
        width: 75,
        height: 75,
        flexWrap: 'wrap',
        borderRadius: 75/2,
        position:"absolute",
        backgroundColor:'white',
        borderWidth: 1,
    }
        //backgroundColor: 'white',
        //borderColor: 'grey',
        //borderWidth: 1,
        
})
export default Circle;
