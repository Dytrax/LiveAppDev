import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, WebView, Text } from 'react-native';
import IconBack from 'react-native-vector-icons/Ionicons';

export default class WatchVideo extends Component<{}> {


  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      video:false
    }
  }
  componentWillMount = () => {
    this.setState({video:true})
  }
  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('video', 'notVideo');
    const artistInfo = navigation.getParam('artistInfo', 'notArtistInfo');
    console.log(artistInfo)
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.left}>
            <IconBack name="ios-arrow-back" size={30} color="rgb(225,21,105)" onPress={() => { this.props.navigation.pop() }} />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Detalles del artista</Text>
          </View>
          <View style={styles.rigth}>
          </View>
        </View>
        <View style={styles.video}>
          { this.state.video ?  (
            <WebView
              source={{ uri: "https://www.youtube.com/embed/" + url }}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true} 
            />) : null
          }
        </View>
        <View style={{marginLeft:10, marginTop:5}}>
          <Text style={{fontWeight:"bold", fontSize:18}}>Descripción Artista</Text>
          <Text style={{fontWeight:"bold", fontSize:15}}>{artistInfo.description}</Text>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  video: {
    flex:0.5,
    margin:20
    //width: '100%',
    //height: 300
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
    fontSize: 18
  },

});