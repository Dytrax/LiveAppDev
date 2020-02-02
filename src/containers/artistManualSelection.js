import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    Linking
} from 'react-native'
import IconBack from 'react-native-vector-icons/Ionicons';
import ButtonCircle from '../components/buttonCircle'
import Location from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from 'react-native-vector-icons/FontAwesome5';
import Clock from 'react-native-vector-icons/AntDesign';
import Disccount from 'react-native-vector-icons/Entypo';
import Cash from 'react-native-vector-icons/MaterialIcons';



/* Provisional */

import Fondo from '../assets/fondos/silueta-08.jpg'
//Import Calendar
import { Calendar, } from "react-native-calendars";
//Import Api to get artist
import ArtistApi from '../../utils/artist/getArtist'
//Import Modal Service
import ServiceModal from './modalPopUp'
import moment from "moment";
//CircleComponent
import dbApi from '../../utils/db/dbApi'
const WIDTH = Dimensions.get('window').width;
class ArtistManualSelection extends Component {




    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            color: false,
            calendar: false,
            dateSelected: false,
            keyBoard: false,
            place: '',
            hour: '',
            artist: []
        };
        this.onDayPress = this.onDayPress.bind(this);
    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const artist = navigation.getParam('artist', 'notUser');
        this.setState({
            artist: artist
        })
        console.log(artist, 'Lo ultimo artistas')
        var fecha = moment().add(2, 'days').format("YYYY-MM-DD")
        console.log(fecha, 'fecha')
        console.log(moment(fecha).unix(), 'fecha timestamp')
        this.setState({
            maxDate: fecha
        })

    }

    stateChange = (stateToChange, value) => {
        this.setState({ [stateToChange]: value.toLowerCase() });
    };


    onDayPress(day) {
        this.setState({
            calendar: false,
            selected: day.dateString,
            dateSelected: true
        })
        console.log(day.dateString)
       
    }

    endReservation = async () => {
        const { navigation } = this.props;
       
        var userId = await dbApi.getData('userId')
        var token = await dbApi.getData('customToken')
        console.log('fecha original', this.state.selected)
        console.log('fecha expirada', moment(this.state.selected).add(2, 'days').format("YYYY-MM-DD"))
        var serviceDate = moment(this.state.selected).unix()
        var expiredDate = moment(moment(this.state.selected).add(2, 'days').format("YYYY-MM-DD")).unix()
        var hourDate = this.state.hour
        var price = this.state.selectedItem.price
        var category = navigation.getParam('itemId', 'NO-ID')
        var artistId = this.state.selectedItem._id
        var userId = userId
        var service_place = this.state.place
        var state = "Wait artist confirmation"
        var token = token
        console.log(serviceDate, 'serviceDate')
        console.log(expiredDate, 'expiredDate')
        var sendService = await ArtistApi.contractService(
            serviceDate,
            expiredDate,
            hourDate,
            price,
            category,
            artistId,
            userId,
            service_place,
            state,
            token
        )
        if (sendService[0]==200){
            Linking.openURL(sendService[1].response).catch((err) => console.error('An error occurred', err));
        }
        console.log(sendService)
    }

   
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.left}>
                        <IconBack name="ios-arrow-back" size={30} color="rgb(225,21,105)" onPress={() => { this.props.navigation.pop() }} />
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.title}>Escoge tu artista</Text>
                    </View>
                    <View style={styles.rigth}>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.artist}
                        renderItem={this.renderArtists}
                        ListEmptyComponent={this.renderEmpty}
                    />
                </View>
                <ServiceModal
                    closeButton={true}
                    modal={this.state.modal}
                    back={() => {
                        this.setState({
                            modal: false
                        })
                    }}
                >
                    <ScrollView keyboardShouldPersistTaps='always'
                        style={{ padding: 16 }}>
                        {
                            !this.state.calendar ? (
                                <View style={{ alignItems: 'flex-start', width: '100%', marginBottom: 10 }}>
                                    <Text style={{ fontWeight: '400', color: 'rgb(0,0,0)', fontSize: 13 }}>{`Hola,${'Carlos'}`}</Text>
                                    <Text style={{ fontWeight: '400', color: 'rgb(0,0,0)', fontSize: 13, marginBottom: 10 }}>¿Dónde será tu evento?</Text>

                                    <View style={styles.phoneForm}>
                                        <View style={styles.iconContainer}>
                                            <Location name="location-on" size={22} color='rgb(0,197,156)'//color='rgb(0,197,156)' 
                                            />
                                        </View>
                                        <View style={styles.phoneContainer}>
                                            <TextInput placeholder={'Dirección'}
                                                style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                               

                                                onChangeText={(text) => this.stateChange('place', text)}
                                            
                                            />
                                        </View>
                                    </View>
                                
                                </View>
                            ) : (null)
                        }

                        <Text style={{ fontWeight: '400', color: 'rgb(0,0,0)', fontSize: 13, marginBottom: 10 }}>¿Cuando será tu evento?</Text>
                        {
                            this.state.dateSelected ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 10 }}>
                                    <CalendarIcon name={'calendar-check'} size={25} color={'rgb(0,197,156)'} style={{ marginRight: 10 }} />
                                    <Text style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 10 }}>{this.state.selected}</Text>
                                </View>
                            ) :
                                (null)
                        }


                        {
                            !this.state.calendar ? (
                                <ButtonCircle color={'rgb(0,197,156)'} text={'Seleccionar fecha'} size={'100%'} action={() => { this.setState({ calendar: true }) }} />
                            ) :
                                (null)
                        }
                        {
                            this.state.calendar ? (
                                <Calendar
                                    onDayPress={this.onDayPress}
                                    style={styles.calendar}
                                    markedDates
                                    minDate={this.state.maxDate}
                                    //hideExtraDays
                                    //maxDate={this.state.maxDate}
                                    //this.props.minDate.slice(6,10)
                                    current={moment().format("YYYY-MM-DD")}
                                    //current={(this.state.selected) ? this.state.selected : ((this.props.minDate === "12/32/2018") ? ("01/01/" + (parseInt(this.props.minDate.substr(this.props.minDate.length-4,this.props.minDate.length))+1)) : this.props.minDate)}
                                    //minDate={(this.props.minDate === "12/32/2018") ? ("01/01/" + (parseInt(this.props.minDate.substr(this.props.minDate.length-4,this.props.minDate.length))+1)) : this.props.minDate}
                                    markedDates={{
                                        [this.state.selected]: {
                                            selected: true,
                                            //disableTouchEvent: true,
                                            //selectedDotColor: "orange"
                                        }
                                    }}
                                    theme={{
                                        selectedDayBackgroundColor: 'rgb(0,197,156)',
                                        arrowColor: 'rgb(0,197,156)',

                                    }}
                                />
                            ) :
                                null
                        }

                        {
                            !this.state.calendar ? (
                                <Text style={{ fontWeight: '400', color: 'rgb(0,0,0)', fontSize: 13, marginBottom: 10, }}>¿Escribe la hora del evento?</Text>

                            ) : (null)
                        }
                        {
                            !this.state.calendar ? (
                                <View style={styles.phoneForm}>
                                    <View style={styles.iconContainer}>
                                        <Clock name="clockcircleo" size={22} color='rgb(0,197,156)' />
                                    </View>
                                    <View style={styles.phoneContainer}>
                                        <TextInput placeholder={'Ej 8:30 PM'}
                                            //onPress={()=>{this.setState({keyBoard:true})}}
                                            onFocus={() => { this.setState({ keyBoard: true }) }}
                                            returnKeyType={"done"}
                                            onSubmitEditing={() => { this.setState({ keyBoard: false }) }}
                                            style={{ fontWeight: '500', color: 'rgb(0,0,0)', fontSize: 14, width: '100%' }}
                                            onChangeText={(text) => this.stateChange('hour', text)}
                                     
                                        />
                                    </View>
                                </View>

                            ) : (null)
                        }

                        {
                            this.state.keyBoard ? (
                                <View style={{ height: 60 }}>

                                </View>
                            ) :
                                (
                                    null
                                )
                        }
                   
                        {
                            !this.state.calendar ? (
                                <ButtonCircle color={'rgb(0,197,156)'} text={'Finalizar reserva'} size={'100%'} action={() => { this.endReservation() }} />

                            ):(null)
                        }

                        
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, marginHorizontal: 2 }}>
                               
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 2 }}>
                              

                            </View>
                            <View style={{ flex: 1, marginHorizontal: 2 }}>
                               
                            </View>


                        </View>

                       
                    </ScrollView>

                </ServiceModal>

            </SafeAreaView>
        )
    }

    goToArtist = (item) => {
        console.log(item)
        this.props.navigation.navigate("Video",{
            video:"Fx4B78r1Xg8?list=RDFx4B78r1Xg8",
            artistInfo:item
        })
    }
    renderArtists2 = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { this.goToArtist(item) }} >
                <View style={[stylesArtists.container, styles.sombra]}>
                    <Image
                        source={item.image_url}
                        style={stylesArtists.imageArtist}
                    />
                    <View style={{ padding: 5, width: '100%' }}>
                        <View style={stylesArtists.titleArtistContainer}>
                            <Text style={stylesArtists.titleArtist}>{item.name}</Text>
                            <View style={{ borderWidth: 1, borderColor: 'rgb(247,247,250)', width: '100%', marginVertical: 10 }} />
                            <Text numberOfLines={2}>{item.description}</Text>
                            <ButtonCircle color={'rgb(0,197,156)'} text={'Reservar'} size={'70%'} action={() => { this.setState({ modal: true }) }} />
                        </View>

                    </View>

                </View>
            </TouchableOpacity>)
    }
    formatNumber = (number) => {
        return (Math.round(number * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    renderEmpty = () => {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>En este momento no encontramos ningun artista</Text>

            </View>
        )
        
    }
    renderArtists = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { this.goToArtist(item) }} >
                <View style={[stylesCircleArtist.container, stylesCircleArtist.sombra]}>
                    <View style={{ flexDirection: 'row', }}>
                        {
                            item.profilePhoto ? (
                                <Image source={item.profilePhoto} style={[stylesCircleArtist.circle]} />

                            ):(
                                <Image source={Fondo} style={[stylesCircleArtist.circle]} />
                            )
                        }
                        <View style={{ marginLeft: 14, flex: 1 }}>
                            <View style={{ flexDirection: 'row' ,marginBottom:5}}>
                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                        
                                        <Disccount name={'price-tag'} size={20} color={"rgb(225,21,105)"}/>
                                        <Text style={{ color: "rgb(225,21,105)" }}>50% off</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Cash name={'attach-money'} size={20} color={'rgb(0,197,162)'}/>
                                        <Text style={{alignSelf:'center'}}>{this.formatNumber(item.price)}</Text>

                                    </View>
                                </View>
                                <ButtonCircle color={'rgb(0,197,162)'} text={'Reservar'} size={'38%'} action={() => { this.setState({ modal: true,
                                selectedItem:item })
                                console.log(item) }} />
                               
                            </View>




                        </View>

                    </View>


                </View>
            </TouchableOpacity>)
    }
}

const stylesCircleArtist = StyleSheet.create({
    container: {
        width: '100%',
        //height:100,
        backgroundColor: 'rgb(255,255,255)',
        marginBottom: 10,
        padding: 10,


    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        //resizeMode:'contain',

    },
    sombra: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 0,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ddd',
       
    },
    sombra2:{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 5, // IOS
        shadowRadius: 5, //IOS
        elevation: 2,
        borderColor: '#ddd',
    }
})

const stylesArtists = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        //backgroundColor:'rgb(150,150,150)'
        //padding: 10,
        //width:'75%'
        //width:WIDTH-20
    },
    imageArtist: {
        height: 120,
        width: '40%',
        borderRadius: 5
        //resizeMode:'contain'
    },
    titleArtistContainer: {
        //alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'black',
        width: '60%'
    },
    titleArtist: {
        fontSize: 14,
        fontWeight: 'bold'
        //marginLeft:20
        //alignSelf:'center'
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(260,260,260)',
    },
    bodyContainer: {
        padding: 10
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
    title: {
        color: "rgb(225,21,105)",
        fontSize:18
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: "#eee",
        height: 350,
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
    sombra: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 5, // IOS
        shadowRadius: 5, //IOS
        elevation: 0,
        borderColor: '#ddd',
    }
})

export default ArtistManualSelection;