import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';

const Loader = props => {
  const {
    title,
    loading,
    ...attributes
  } = props;
return (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}>
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    color={'red'}
                    //animating={loading}
                     />
                 <Text style={{position:"absolute",bottom:10}}>{title}</Text> 
            </View>
            
        </View>





    </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      //display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
export default Loader;