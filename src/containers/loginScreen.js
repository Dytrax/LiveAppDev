import React, {Component} from 'react'
import {

    StyleSheet,

    View,
    Text,

    Image,
    Dimensions,
    TextInput,

    KeyboardAvoidingView,
    TouchableOpacity

  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Lock from 'react-native-vector-icons/SimpleLineIcons'
  import Logo from '../assets/Logo.jpg'




  //Api Auth
  import LoginApi from '../../utils/login/apiUserLogin'
  //Function to show user Alert
  import alertApi from '../../utils/appApi/alerApi'
  //Api Mobile DataBase
  import dbApi from '../../utils/db/dbApi'
  import Loader from './loader'
  const WIDTH = Dimensions.get('window').width;
  class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        celular: '',
        password: '',
        auth:false };
    }

    stateChange = (stateToChange, value) => {
      this.setState({ [stateToChange]: value });
  };


    loginUser = async (phone, password) => {
        console.log(password)
        console.log(phone)
        this.setState({auth:true})
        var loginReponse = await LoginApi.loginUser(phone.toString(),password.toString())
        if (loginReponse[0]===201 || loginReponse[0]===200){
          //loginReponse[1].message.es
          this.setState({auth:false})
          /* alertApi.postMessage("Bienvenido",'Carlos',"success") */
          dbApi.store("customToken",loginReponse[1].customToken)
          dbApi.store("userId",loginReponse[1].userId)
          dbApi.store("userInfo",JSON.stringify(loginReponse[1].info.basicInformation))
          this.props.navigation.navigate('RootHome', {
            user: 'Old',
          });
  
        }else{
            console.log(loginReponse[1])
            this.setState({auth:false})
          alertApi.postMessage(loginReponse[1].message,'Error','warning')
        }
        console.log(loginReponse)
    }
   
    
    render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior='hight'>
          <Loader loading={this.state.auth} title={"Entrando..."}/>
           <View style={{flex:0.9, paddingBottom:50, justifyContent:'center', alignItems:'center'}}>
               
                <Image source={Logo} style={styles.logo} />

                </View>
               
                    <View style={styles.form}>
                       
                            <View style={styles.phoneForm}>
                                <View style={styles.iconContainer}>
                                    <Icon name="whatsapp" size={24} color='#C5CCD6' />
                                </View>
                                <View style={styles.phoneContainer}>
                                    <TextInput placeholder={'Celular                             '}
                                        style={{ fontWeight: '500', fontSize: 17, color: 'rgb(105,105,105)' }}
                                       
                                        onChangeText={(txt) => this.stateChange('celular', txt)}
                                    />
                                </View>
                            </View>
                            <View style={styles.phoneForm}>
                                <View style={styles.iconContainer}>
                                    <Lock name="lock" size={22} color='#C5CCD6' />
                                </View>
                                <View style={styles.phoneContainer}>
                                    <TextInput placeholder={'Contraseña                           '}
                                        style={{ fontWeight: '500', fontSize: 17, color: 'rgb(105,105,105)' }}
                                        onChangeText={(txt) => this.stateChange('password', txt)}
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                            
                           
                            <View style={styles.buttonContainer}>
                        <TouchableOpacity
                                style={[styles.SubmitButtonStyle,{backgroundColor:'#ff9f43'}]}
                                activeOpacity={.5}
                                onPress={()=>{this.loginUser(this.state.celular,this.state.password)}}
                            >

                                <Text style={styles.TextStyle}>Ingresar </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.props.navigation.navigate("Registro")}}
                            >

                                <Text style={styles.TextStyle}>Registro</Text>

                            </TouchableOpacity>
                        </View>
            

                    </View>

                </KeyboardAvoidingView>
        );
    }
};
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'rgb(255,255,255)',
      justifyContent:'center',
     
  },

  footer: {
      alignSelf: 'center',
     
      width: WIDTH - 100,
     
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
  
  },
  logoContainer: {
      alignSelf: 'center'
  },
  logo: {
      width: 250,
      height: 250,
      resizeMode: 'contain'
  },

  logo2: {
      width: 40,
      height: 40,
      resizeMode: 'contain'
  },
  phoneForm: {
      borderBottomWidth: 1,
      borderBottomColor: '#C5CCD6',
      flexDirection: 'row',
      marginVertical: 10
  },
  formContainer: {
      position: "absolute",
     
      bottom: '10%',
      paddingBottom: 40,
     
      width: WIDTH - 100,

  },
  iconContainer: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
  },
  phoneContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'

  },
  buttonContainer: {
      
      width: WIDTH - 100,
  },
  form:{
      alignItems:'center',
      paddingHorizontal:40
      
  },
  SubmitButtonStyle: {

      paddingTop: 15,
      paddingBottom: 15,
    
      backgroundColor: "#feca57",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
    },
  
    TextStyle: {
      color: '#fff',
      textAlign: 'center',
      fontWeight:'bold'
    },
    SignUpButton: {
  
      paddingTop: 15,
    
      backgroundColor: "#0AC4BA",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
    }


});

  
  export default LoginScreen;