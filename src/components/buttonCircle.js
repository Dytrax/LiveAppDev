import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity
    
} from "react-native"


export default function ButtonCircle (props){

    return(
        <TouchableOpacity
                onPress={props.action}
                underlayColor="white"
                style={[styles.forgetButton,{width:props.size,backgroundColor:props.color},styles.sombra]}
                >
            
                    <Text style={styles.buttonText}>{props.text}</Text>
            
                </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 13,
        fontWeight:'bold'
      },
      forgetButton:{
        margin:10,
        justifyContent:"center",
        height:27,
        alignSelf:"center",
        //backgroundColor:'rgb(0,197,156)',
        borderRadius: 20,
      },
      sombra:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 5, // IOS
        shadowRadius: 5, //IOS
        elevation: 2,
        borderColor: '#ddd',
    }
})