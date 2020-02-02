import { createStackNavigator } from "react-navigation"
import HomeScreen from '../src/containers/homeScreen';
import ArtistManualSelection from "../src/containers/artistManualSelection";
import Video from '../src/containers/Video'
import ServicesResume from "../src/containers/servicesResume";
const ArtistListRoot = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            },
            
        },
        ServicesResume: {
            
          screen: ServicesResume,
          path:'resumenpago',
          navigationOptions: {
              header: null,
              gesturesEnabled: false
          },
          
      },
        ArtistList: {
            screen: ArtistManualSelection,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            },
          
        },
        Video: {
          screen: Video,
          navigationOptions: {
                header: null,
                gesturesEnabled: false
            },
          
        },
        
        /* Home: {screen:HomeScreen,
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
    },
);
export default ArtistListRoot
