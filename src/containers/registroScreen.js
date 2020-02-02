import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import Logo from '../assets/post8.png'


import API from '../../utils/login/apiUserLogin'


import { showMessage, hideMessage } from "react-native-flash-message";
import alertApi from '../../utils/appApi/alerApi'
import Loader from './loader'
const WIDTH = Dimensions.get('window').width;
class RegistroScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celular: '',
            password: '',
            password2: '',
            code:'',
            processing:false
        };
    }

    stateChange = (stateToChange, value) => {
        /*   this.state[stateToChange] = value; */
        var data = value
        if (stateToChange==="code"){
            data = value.toLowerCase()
        }

        this.setState({ [stateToChange]: data });
        console.log(data)
    };


    createUser = async () => {
        this.setState({processing:true})
        const createUser =  await API.createUser(this.state.celular,this.state.password2,this.state.code)
        console.log(createUser)
        if (createUser[0]===201 || createUser[0]===200){
            alertApi.postMessage(createUser[1].message,'Codigo enviado a su celular',"success")
            this.props.navigation.navigate('CodeConfirmation', {
                number: this.state.celular,
              });
            
            
            this.setState({processing:false})
           
        }else{
            alertApi.postMessage(createUser[1].message.es,'Error' ,"warning")
            this.setState({processing:false})
        }
      
    }
    createUser2 = async () => {
        this.props.navigation.navigate("CodeConfirmation")
    }

   
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='hight'>
                <Loader loading={this.state.processing} title={'Cargando'}/>
                <View style={{flex:0.9, alignItems:'center'}}>
                <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold',color:'#e0e0e0'}}>Registrate </Text>
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
                                        value={this.state.celular}
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
                            <View style={styles.phoneForm}>
                                <View style={styles.iconContainer}>
                                    <Lock name="lock" size={22} color='#C5CCD6' />
                                </View>
                                <View style={styles.phoneContainer}>
                                    <TextInput placeholder={'Contraseña                           '}
                                        style={{ fontWeight: '500', fontSize: 17, color: 'rgb(105,105,105)' }}
                                        onChangeText={(txt) => this.stateChange('password2', txt)}
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                            <View style={styles.phoneForm}>
                                <View style={styles.iconContainer}>
                                    <Lock name="lock" size={22} color='#C5CCD6' />
                                </View>
                                <View style={styles.phoneContainer}>
                                    <TextInput placeholder={'Codigo opcional'}
                                        style={{ fontWeight: '500', fontSize: 17, color: 'rgb(105,105,105)' }}
                                        onChangeText={(txt) => this.stateChange('code', txt)}
                                        
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                        <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={this.createUser}
                            >

                                <Text style={styles.TextStyle}>Resgistrarme</Text>

                            </TouchableOpacity>
                        </View>
            

                    </View>

                {/* </KeyboardAvoidingView> */}
               
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
        //backgroundColor:'black',
        width: WIDTH - 100,
        //height:50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        //marginBottom:20
    },
    logoContainer: {
        alignSelf: 'center'
    },
    logo: {
        width: '80%',
        height: '80%',
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
        //left: 0,
        //right: 0,
        bottom: '10%',
        paddingBottom: 40,
        //bottom: 20,
        //alignSelf: 'center',
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

        //marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        //marginLeft: 30,
        //marginRight: 30,
        //backgroundColor: '#00BCD4',
        //#0AC4BA
        backgroundColor: "#feca57",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    
      TextStyle: {
        color: '#fff',
        textAlign: 'center',
      },
      SignUpButton: {
    
        //marginTop: 10,
        paddingTop: 15,
        //paddingBottom: 15,
        //marginLeft: 30,
        //marginRight: 30,
        //backgroundColor: '#00BCD4',
        backgroundColor: "#0AC4BA",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
      }


});

export default RegistroScreen;