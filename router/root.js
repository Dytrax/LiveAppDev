import { createStackNavigator } from "react-navigation"
//import LoginScreen from '../src/containers/loginScreen'
import RegistroScreen from '../src/containers/registroScreen'
import HomeScreen from "../src/containers/homeScreen";
//import RecuperarScreen from "../src/components/Login/Recuperar"
//import Color from '../config/color'
//import MenuV2 from './MenuV2'
import ArtistList from './artistListRoot'
import LoginScreen from '../src/containers/loginScreen'
import CodeConfirmation from "../src/containers/codeConfirmation";

const Root = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        },
        Registro: {screen:RegistroScreen,
          path:'registro',
          navigationOptions:{
            //header: null,
              headerStyle: {
                backgroundColor: 'white',
                borderBottomColor: "transparent",
                elevation:0
              },
              headerTintColor: 'grey',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title:null
            },
            
          
      },CodeConfirmation: {
        screen: CodeConfirmation,
        navigationOptions: {
          
            header: null,
            gesturesEnabled: false
        }
    },RootHome: {screen:ArtistList,
        path: '',
        navigationOptions:{
          header: null,
            headerStyle: {
              backgroundColor: 'rgb(226,228.235)',
            },
            headerTintColor: 'rgb(65,109,219)',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title:'Regitro'
          }
        
    }, 
        /* Registro: {screen:RegistroScreen,
            navigationOptions:{
                headerStyle: {
                  backgroundColor: 'rgb(226,228.235)',
                },
                headerTintColor: 'rgb(65,109,219)',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                title:'Regitro'
              }
            
        },
        RootHome: {screen:ArtistList,
            navigationOptions:{
              header: null,
                headerStyle: {
                  backgroundColor: 'rgb(226,228.235)',
                },
                headerTintColor: 'rgb(65,109,219)',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                title:'Regitro'
              }
            
        }, */
        /* Recuperar: {screen:RecuperarScreen,
                    navigationOptions:{
                        headerStyle: {
                          backgroundColor: Color.primary,
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                        title:'Recuperar'
                      }
                    },
        Menu: { 
            screen:MenuV2,
            navigationOptions:{
              header: null,
              gesturesEnabled: false
            }}, */

    },
);
export default Root
