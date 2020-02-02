import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,

    Image,
    Dimensions,
    TextInput,

    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import Name from 'react-native-vector-icons/MaterialIcons';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import City from 'react-native-vector-icons/FontAwesome5';
import Addres from 'react-native-vector-icons/Entypo';




import Home from 'react-native-vector-icons/AntDesign';
import Logo from '../assets/Logo.jpg'
import Mariachis from '../assets/fondos/mexican.png'
import Vallenato from '../assets/fondos/vallenato.png'
import Popular from '../assets/fondos/popular.png'

//import Vallenato from '../assets/fondos-09.jpg'
import Profile from 'react-native-vector-icons/FontAwesome';
import Saxo from 'react-native-vector-icons/MaterialCommunityIcons';
const WIDTH = Dimensions.get('window').width;
import { tsParenthesizedType } from '@babel/types';
import ButtonCircle from '../components/buttonCircle'

import ModalPopUp from './modalPopUp';
import IconService from '../components/iconService'
import Saxo2 from '../assets/saxophone.png'
import Rock from '../assets/rock.png'
import DJ from '../assets/dj.png'
import Piano from '../assets/piano.png'

//DB API
import dbApi from '../../utils/db/dbApi'
//getArtist Api
import artistApi from '../../utils/artist/getArtist'
import updateUserApi from '../../utils/login/apiUserLogin'
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        modal:false,
        color:false,
        modalDatos:false,
        name:'',
        city:'',
        address:'',
        email:''
         };
      }
    componentDidMount = async () =>{
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'No-Number')
        var token = await dbApi.getData('customToken')
        if (user === 'New') {
            this.setState({modalDatos:true})
        }else{
            
            var userId = await dbApi.getData('userId')
            var userInfo = await dbApi.getData('userInfo')
        }
    }
    stateChange = (stateToChange, value) => {
        this.setState({ [stateToChange]: value.toLowerCase() });
    };
    askService = () => {
        this.setState({
            modal:true,
        
        })
    }

    goToArtist = async  (category) => {
        var token = await dbApi.getData('customToken')
        var artists = await artistApi.getArtist(category,'cali',token)
        console.log(artists)
        if( artists[0]===200){
            console.log(artists[1].response)
            this.props.navigation.navigate('ArtistList', {
                artist : artists[1].response,
                category:category              
              });
        }else{

        }
          
    }
    updateUser = async () => {
        var userId = await dbApi.getData('userId')
        console.log(userId)
        if (this.state.name && this.state.email && this.state.city && this.state.address){
            var userUpdate = await updateUserApi.updateUser(this.state.name,this.state.email,
                this.state.city,this.state.address,userId)
            console.log(userUpdate)
            if (userUpdate[0]===200){
                dbApi.store("name",userUpdate[1].basicInformation.name)
                dbApi.store("email",userUpdate[1].basicInformation.name.email)
                dbApi.store("city",userUpdate[1].basicInformation.name.city)
                dbApi.store("address",userUpdate[1].basicInformation.name.address)
                dbApi.store("phone",userUpdate[1].basicInformation.name.phone)
                this.setState({
                    modalDatos:false
                })
            }else{
                this.setState({
                    modalDatos:true
                })
                Alert.alert(
                    'No fue posible actualizar tus datos',
                    'Intenta nuevamente',
                    [
                      {text: 'Entendido', onPress: () => console.log('Ask me later pressed')},
                      
                     
                    ],
                    {cancelable: false},
                  );
            }
            
            
        }else{
            Alert.alert(
                'Datos incompletos',
                'Para utilizar live son necesarios estos datos',
                [
                  {text: 'OK', onPress: () => console.log('Ask me later pressed')},
                  
                 
                ],
                {cancelable: false},
              );
        }
        
    }

    renderConciertos = ({item}) => {
        return(
        <TouchableWithoutFeedback onPress={()=>{this.goToArtist()}}>
        <Image source={item.image_url} style={{width:'100%',height:150,
        marginVertical:5,
      
        
        }}>
        </Image>
        </TouchableWithoutFeedback>)
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ModalPopUp
                    modal={this.state.modalDatos}
                    back={() => {
                        this.setState({
                            modalDatos: false
                        })
                    }}
                >
                    <ScrollView keyboardShouldPersistTaps='always'
                        style={{ padding: 16, paddingBottom:0 }}>
                     <View style={{ alignItems: 'flex-start', width: '100%', marginBottom: 10 }}>
                                    <Text style={{ fontWeight: '400', color: 'rgb(0,0,0)', fontSize: 13, marginBottom: 10 }}>Bienvenido a Live, completa la siguiente información para terminar con tu perfil</Text>

                                    <View style={styles.phoneForm}>
                                        <View style={styles.iconContainer}>
                                            <Name name="perm-identity" size={22} color='rgb(0,197,156)'//color='rgb(0,197,156)' 
                                            />
                                        </View>
                                        <View style={styles.phoneContainer}>
                                            <TextInput placeholder={'Nombre'}
                                                style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                    

                                                onChangeText={(text) => this.stateChange('name', text)}
                                                value={this.state.place}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.phoneForm}>
                                        <View style={styles.iconContainer}>
                                            <Email name="email" size={22} color='rgb(0,197,156)'//color='rgb(0,197,156)' 
                                            />
                                        </View>
                                        <View style={styles.phoneContainer}>
                                            <TextInput placeholder={'Email'}
                                                style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                              
                                                onChangeText={(text) => this.stateChange('email', text)}
                                                value={this.state.place}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.phoneForm}>
                                        <View style={styles.iconContainer}>
                                            <City name="city" size={22} color='rgb(0,197,156)'//color='rgb(0,197,156)' 
                                            />
                                        </View>
                                        <View style={styles.phoneContainer}>
                                            <TextInput placeholder={'Ciudad'}
                                                style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                                
                                                onChangeText={(text) => this.stateChange('city', text)}
                                                value={this.state.place}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.phoneForm}>
                                        <View style={styles.iconContainer}>
                                            <Addres name="address" size={22} color='rgb(0,197,156)'//color='rgb(0,197,156)' 
                                            />
                                        </View>
                                        <View style={styles.phoneContainer}>
                                            <TextInput placeholder={'Dirección'}
                                                style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                               
                                                onChangeText={(text) => this.stateChange('address', text)}
                                                value={this.state.place}
                                            />
                                        </View>
                                    </View>
                                    <ButtonCircle color={'rgb(0,197,156)'} text={'Listo'} size={'100%'} action={() => { this.updateUser() }} />
                                   
                                </View>
                                    </ScrollView>

                </ModalPopUp>
                <View style={styles.header}>
                    <View style={styles.left}>
                        <Profile name="user-circle" size={30} color="rgb(225,21,105)" />
                    </View>
                    <View style={styles.center}>
                        <Image source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.rigth}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ServicesResume')}}>
                            <Saxo name="saxophone" size={30} color="rgb(238,165,83)" />
                        </TouchableOpacity>
                        
                    </View>
                </View>
             
                <View style={[styles.bodyContainer]}>


                    
                    <View style={[{height:300,width:'100%'}]}>
                    <View style={{marginBottom:20}}>
                    <Text style={{fontSize:16,fontWeight:'700'}}>Vive la musica, contrata un artista</Text>
                    </View>
                
                        <View style={{flexDirection:'row'}}>
                        <IconService img={Mariachis} 
                            color={'rgb(0,20,75)'}
                            title={'Mariachis'}
                            action={()=>this.goToArtist('mariachis')}/>
                            <IconService img={Vallenato} 
                            color={'rgb(277,233,237)'}
                            title={'Vallenato'}
                            action={()=>this.goToArtist('vallenato')}/>
                            <IconService img={Popular}
                             color={'rgb(44,110,123)'} 
                            title={'Popular'}
                            action={()=>this.goToArtist('popular')}/>
                             <IconService img={Saxo2}
                             color={'rgb(0,182,208)'} 
                            title={'Jazz'}
                            action={()=>this.goToArtist('jazz')}/>
                            
                        </View>

                        <View style={{marginBottom:20,marginTop:50}}>

                    </View>
                    <View style={{flexDirection:'row'}}>
                    <IconService img={Rock} 
                            color={'rgb(251,216,117)'}
                            title={'Rock'}/>
                            <IconService img={DJ} 
                            color={'rgb(243,130,51)'}
                            title={'Electronica'}/>
                            <IconService img={Piano}
                             color={'rgb(0,184,208)'} 
                            title={'Clasica'}/>
                            {/* <IconService img={Mariachis} 
                            color={'rgb(0,20,75)'}
                            title={'Mariachis'}
                            action={()=>this.goToArtist('mariachis')}/>
                            <IconService img={Vallenato} 
                            color={'rgb(277,233,237)'}
                            title={'Vallenato'}
                            action={()=>this.goToArtist('vallenato')}/>
                            <IconService img={Popular}
                             color={'rgb(44,110,123)'} 
                            title={'Dedicatoria'}/>
                             <IconService img={Popular}
                             color={'rgb(44,110,123)'} 
                            title={'Dedicatoria'}/> */}
                        </View>
                        
                    </View>
                    
                    <View style={{width:'100%',height:'100%',//backgroundColor:'black'
                }}>
                 
                    </View> 
                   <ModalPopUp
                   modal={this.state.modal}
                   >   
                    <View style={{padding:16}}>
                        <View style={{alignItems:'flex-start',width:'100%',marginBottom:10}}>
                        <Text style={{fontWeight:'400',color:'rgb(0,0,0)',fontSize:13}}>{`Hola,${'Usuario.X'}`}</Text> 
                        <Text style={{fontWeight:'400',color:'rgb(0,0,0)',fontSize:13  ,marginBottom:10}}>¿Dónde será tu evento?</Text> 

                        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-start'}}>
                            <Home name={'home'} size={25} color={'rgb(0,197,156)'} style={{marginRight:10}}/>
                            <Text style={{fontWeight:'500',color:'rgb(0,0,0)',fontSize:10}}>Cra 67B # 41 - 34</Text> 


                        </View>
                        <View style={{borderWidth:1,borderColor:'rgb(247,247,250)',width:'100%',marginVertical:10}}/>

                        </View>
                        <View style={{alignItems:'flex-start',width:'100%',}}>
                        <Text style={{fontWeight:'400',color:'rgb(0,0,0)',fontSize:13  ,marginBottom:10}}>¿Cual es tu presupuesto?</Text> 

                        </View>
                        <View style={{flexDirection:'row',}}>
                            <View style={{flex:1,marginHorizontal:2}}>
                              
                                <ButtonCircle text={'400K'} size={60}/>
                            </View>
                            <View style={{flex:1,marginHorizontal:2}}>
                              
                                <ButtonCircle text={'600K'} size={60}/>

                            </View>
                            <View style={{flex:1,marginHorizontal:2}}>
                               
                                <ButtonCircle text={'900K'} size={60}/>

                            </View>
                            
                
                        </View>
                        
                        <View style={{borderWidth:1,borderColor:'rgb(247,247,250)',width:'100%',marginVertical:10}}/>
                        <View style={{alignItems:'flex-start',width:'100%'}}>
                        <Text style={{fontWeight:'400',color:'rgb(0,0,0)',fontSize:13  ,marginBottom:10}}>Por ultimo, escoje una opción</Text> 
                        </View>
                    
                        <ButtonCircle text={'Encontramos tu artista'} size={'100%'}/>
                    
                        <ButtonCircle text={'Tu eliges el artista'} size={'100%'}/>
                      
                    </View>
                       
                   </ModalPopUp>
               

                </View>
              
            </SafeAreaView>
        )
    }


    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
    },
    header: {
        height: '8%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,232,237)',
        marginBottom: 5
    },
    left: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rigth: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    bodyContainer: {
        padding: 5,
        margin:10,
        backgroundColor:'rgb(255,255,255)',
    
        //flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    sombra: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        //backgroundColor: '#fff', 
        elevation: 2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        /* shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1, */
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    signup: {
        backgroundColor: 'white',
        color: '#3A59FF',
        width: "65%",
        borderRadius: 25,
        //textAlign: 'center',
        fontWeight: 'bold',
        //marginLeft: '18%',
        //padding: "2%",
        fontSize:  33,
        //marginTop: '70%'
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

    phoneForm: {
        borderBottomWidth: 1,
        borderBottomColor: "rgb(216,216,216)",
        flexDirection: 'row',
        marginVertical: 10,

    },
});
export default HomeScreen;