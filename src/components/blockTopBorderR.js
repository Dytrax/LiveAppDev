import React, { Component } from 'react';
 
import { Platform, StyleSheet, View, Image, Text } from 'react-native';
import Space from '../assets/space.jpg'
export default class BlockTopBorderR extends Component {
    constructor(){
        super()
        this.state = {
           transform:true
        }
    }
    
    render()
    {   
        const { transform } =  this.props
        return(
            <View style={[styles.imageViewStyle ,{backgroundColor: this.props.bckColor,}, transform && styles.imageViewStyleT ]}>                
                
                <Image source={this.props.img}
                           style={{width: '100%', height: 120,transform:[{ rotate: '180deg'}]}} /> 
                {!transform &&
                     null
                }
                <View style={{transform:[{ rotate: '180deg'}]}}
                
                > 
                <Text style={styles.title}>{this.props.title}</Text>
                    {this.props.children}
                </View>
                
            </View>
        );
    }
}
 
const styles = StyleSheet.flatten(
{   title:{
        position:'absolute',
        top: 30,
        alignSelf: 'center',
        color:'#fff',
        fontSize: 40,
        fontWeight: 'bold',
        
    },  
    imageViewStyleT:{
        width: '100%', 
        height: 120, 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        overflow: "hidden",
        transform:[{ rotate: '180deg'}],
        
    },
    imageViewStyle:{
        
        width: '100%', 
        height: 120, 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        overflow: "hidden",
       
    }
});