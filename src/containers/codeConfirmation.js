import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native'
import CodeInput from 'react-native-confirmation-code-field';
import API from '../../utils/login/apiUserLogin'
import alertApi from '../../utils/appApi/alerApi'
import dbApi from '../../utils/db/dbApi'
//import Logo
class CodeConfirmation extends Component {
  handlerOnFulfill = async (code) => {
    
    const verifyCode = await API.confirmUserCode(code);
    console.log(verifyCode)
  if (verifyCode[0]===200 || verifyCode[0]===201){
      dbApi.store("customToken",verifyCode[1].customToken)
      dbApi.store("userId",verifyCode[1].userId)
      dbApi.store("userInfo",JSON.stringify(verifyCode[1].info.basicInformation))
      this.props.navigation.navigate('RootHome', {
        user: 'New',
      });
      
       //Next Form of user 
       /* GetName
        Get Email
        Get City */
   }else{
     alertApi.postMessage(sendUserId[1].message,'Error' ,"warning")
       //show messagewq
   }
  
}
handlerOnFulfill2 = async (code) => {
  this.props.navigation.navigate('RootHome', {
    user: 'New',
  });
}
 
  render() {
    const { navigation } = this.props;
    const number = navigation.getParam('number', 'No-Number')
    return (
        <SafeAreaView style={{alignItems:'center',justifyContent:'center',backgroundColor:'rgb(254,69,89)',flex:1}} >
            <Text style={{fontSize:18,color:'white',fontWeight:'bold',marginBottom:10}}>Verificación</Text>
            <Text style={{fontSize:14,color:'white',width:'80%',textAlign:'center'}}>Por favor escriba el codigo de verificacion que le hemos enviado al {number}</Text>
            <View style={{marginTop:'40%'}}>
                <CodeInput onFulfill={this.handlerOnFulfill} />
            </View>
            
        </SafeAreaView>
    );
  }
}
export default CodeConfirmation;