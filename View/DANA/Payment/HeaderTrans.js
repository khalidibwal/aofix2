import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import ION from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderTrans = ({navigation}) => {
    // const navigation = useNavigation()
    const backtoHome = () =>{
        navigation.goBack()
    }
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backIconContainer} onPress={backtoHome}>
          <ION name='chevron-back' size={20} color='white' />
        </TouchableOpacity>
        <Text style={styles.friend}>Transaction</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center', // Centers the text
      alignItems: 'center', 
      backgroundColor: '#0095D9', 
      paddingHorizontal: 5, 
      paddingVertical: 10, 
      height: 80, 
    },
    backIconContainer: {
      position: 'absolute', // Positioning the back icon absolutely
      left: 10, // Align to the left side of the header
      top: '60%', // Vertically center the icon within the header
      transform: [{ translateY: -10 }] // Adjust to ensure proper vertical centering
    },
    friend: {
      color: 'white',
      fontWeight: '500',
    //   textAlign: 'left',
      fontSize:20
    },
  });
  
  export default HeaderTrans;
  