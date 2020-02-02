import React, {Component} from 'react'
import {Image,StyleSheet,View,Dimensions} from 'react-native'
var {HEIGHT, WIDTH} = Dimensions.get('window');

class Square extends Component {
    render(){
        return(
            <View>
               {/* <View style={styles.circleImgEffect}/>  */}
                <Image source={this.props.img} style={styles.img} resizeMode="contain"/> 
            </View>
            
        )
    }
}


const styles = StyleSheet.create({
    img:{
        //flex:1,
        //height:150,
        width:WIDTH,
        //resizeMode:'contain'

    }
        
})
export default Square;
