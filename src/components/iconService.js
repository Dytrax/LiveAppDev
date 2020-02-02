import React, {Component} from 'react'
import { View,
StyleSheet,
Image,
Text,
TouchableOpacity } from "react-native";

class IconService extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
                    <TouchableOpacity onPress={this.props.action}>
                        <View style={{ width:60,marginRight:30}}>
                        <View //source={this.props.img} 
                        style={[{height:55, width:'90%',borderRadius:16,backgroundColor:this.props.color,alignSelf:'center'}]}>
                            <Image source={this.props.img} resizeMode='contain' style={{height:50, width:'100%'}}/>
                        </View>
                        <View style={{ position:'absolute',top:60,alignContent:'center',alignSelf:'center'}}>
                            <Text style={{marginTop:2,width:'110%'}} >{this.props.title}</Text>          

                        </View>
                        </View>
                    </TouchableOpacity>
                        
                   
        )
    }

}

export default IconService;