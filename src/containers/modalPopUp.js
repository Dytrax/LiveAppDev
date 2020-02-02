import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight
} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';



class ModalPopUp extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return (
      <Modal
          transparent={true}
          animationType={'none'}
          visible={this.props.modal}
          
          >
          <View style={styles.modalBackground}>
            {
              this.props.closeButton ? (
                <TouchableOpacity
            onPress={this.props.back}
            //style={[{position:'relative',top:20,transform: [{'translate': [0,0, 1]}]},styles.circle]}
            >
              <View style={{alignItems:'center',justifyContent:'center',width: 40,
                    height: 40,
                    borderRadius: 40/2,
                    backgroundColor:'rgb(255,255,255)',
                    alignSelf:'flex-start'}}>
                  <Back name="md-close" size={22} color='rgb(0,197,156)'/>
              </View>
             

            </TouchableOpacity>
              ) : (null)
            }
            

            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.activityIndicatorWrapper}>
              {/* <View style={styles.activityIndicatorWrapper}> */}
                {this.props.children}
                {/* <View>
                  <Button size={'100%'} text={'Aceptar'} action={this.props.action}/>
                </View> */}
              {/* </View> */}
              </KeyboardAvoidingView>

          </View>
  
  
  
  
  
      </Modal>
      )
  }
}


const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
      position:'relative',
      //top:'10%',
      padding:10,
      backgroundColor: '#FFFFFF',
      //height: '50%',
      width:'80%',
      //width: 100,
      borderRadius: 10,
      //marginTop:'30%',
      //height:500
      //display: 'flex',
      //alignItems: 'center',
      //justifyContent: 'center'
    },
    onText:{
      //color:Color.primary
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 40/2,
      backgroundColor: 'rgb(248,91,92)'
  }
  
  });
export default ModalPopUp;