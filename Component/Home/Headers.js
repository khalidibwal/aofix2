import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from 'react-native';

const Headers = () => {
  return (
    <View style={styles.headerBackground}>
      {/* Ensure the status bar has the desired appearance */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.cloudContainer}>
        <Image
          source={require('../../Assets/Image/Auth/cloud.png')}
          style={styles.cloudImage}
        />
      </View>
      
      <View style={styles.header}>
        <Image
          source={require('./../../Assets/Image/Auth/icon-aofix.png')}
          style={styles.logo}
        />
        
        <View style={styles.notificationContainer}>
          <TouchableOpacity>
            <Image
              source={require('./../../Assets/Image/Home/Icons/Notification.png')}
              style={[styles.notifLogo, { tintColor: '#5194DB' }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../Assets/Image/Home/Icons/Plus.png')}
              style={[styles.notifLogo, { tintColor: '#5194DB' }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.logoTextContainer}>
        <Text style={styles.logoText}>AO FIX</Text>
        <Text style={styles.logoDesc}>YOUR FIX BUDDY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#fff',
    paddingTop: 0,  // Removes any extra padding at the top
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  notificationContainer: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifLogo: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  logoTextContainer: {
    alignItems: 'center',
    // marginTop: 10,
  },
  logoText: {
    color: '#5194DB',
    fontSize: 17,
  },
  logoDesc: {
    // marginTop: 5,
    fontSize: 10,
    color: '#CBCBCB',
  },
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '35%',
    height: 100,
  },
  cloudImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Headers;
