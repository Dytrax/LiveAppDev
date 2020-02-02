import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";
import IconBack from 'react-native-vector-icons/Ionicons';
import Location from 'react-native-vector-icons/MaterialIcons';
import Services from '../../utils/user/getServices'
import DB from '../../utils/db/dbApi'
import moment from "moment";
class ServicesResume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services:[],
            services2:["a","b","c"]
        };
    }

    componentDidMount = async  () => {
        /* const token = await  */
        const token = await DB.getData("customToken")
        console.log("token  ",token)
        const userId = await DB.getData("userId")
        const Servicios = await Services.getServicesResume(userId,token)
        var list = []
        list.push(Servicios[1])
        console.log(list)
        this.stateChange("services",list)
        
        console.log(token)
        console.log(userId)
        console.log(Servicios)
    }
    stateChange = (stateToChange, value) => {
        this.setState({ [stateToChange]: value });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.left}>
                        <IconBack name="ios-arrow-back" size={30} color="rgb(225,21,105)" onPress={() => { this.props.navigation.pop() }} />
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.title}>Servicios</Text>
                    </View>
                    <View style={styles.
                    
                    rigth}>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <FlatList
                        data={this.state.services}//this.state.artist}this.getData()
                        renderItem={this.renderServices}
                        //ListEmptyComponent={this.renderEmpty}
                    />
                </View>
            
            </View>
        )
    }


    renderServices = ({ item }) => {
        var dateString = moment.unix(item.serviceDate).format("MM/DD/YYYY");
        var fecha = new Date((item.serviceDate)*1000)
        var day = fecha.getDate()
        //var Month = fecha.
        console.log(fecha)
        console.log(day)
        //console.log(Month)
        console.log(dateString)
        return (
            <TouchableOpacity onPress={() => {console.log("hh") }} >
                <View style={[stylesCircleArtist.container, stylesCircleArtist.sombra]}>
                    <Text style={{color:'rgb(223,9,0)',fontSize:12}}>! Nuevo Evento !</Text>
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center',marginTop:10}}>
                   <Location name="location-on" size={25} color="rgb(0,221,223)"/>
                    <Text style={{fontWeight:'bold',marginLeft:5}}>{ item.place}</Text>
                   </View>
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                   <Location name="update" size={25} color="rgb(0,221,223)"/>
                    <Text style={{fontWeight:'bold',marginLeft:5}}>{ item.hourDate}</Text>
                   </View>
                   <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                   <Text style={{fontWeight:'bold'}}>Artista confirmado el dia: </Text>
                   <Text style={{fontWeight:'bold'}}>{dateString}</Text>
                   </View>
                   

                </View>
            </TouchableOpacity>)
    }


}
const stylesCircleArtist = StyleSheet.create({
    container: {
        flex:1,
        //width: '100%',
        //height:100,
        backgroundColor: 'rgb(255,255,255)',
        //marginBottom: 10,
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
        //borderBottomWidth: 0,
        
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        //justifyContent: 'center',
        //alignItems: 'center'
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
    bodyContainer: {
        padding: 10
    }
})
export default ServicesResume;