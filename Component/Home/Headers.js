import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const Headers = () => {
  return (
    <>
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
              style={[styles.notifLogo, {tintColor: '#5194DB'}]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./../../Assets/Image/Home/Icons/Plus.png')}
              style={[styles.notifLogo, {tintColor: '#5194DB'}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logoTextContainer}>
        <Text style={styles.logoText}>AO FIX</Text>
        <Text style={styles.logoDesc}>YOUR FIX BUDDY</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  headerLocation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
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
  mapLogo: {
    width: 12,
    height: 15,
    right: 10,
  },
  logoTextContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  logoText: {
    color: '#5194DB',
    fontSize: 17,
    marginTop: 5,
  },
  logoDesc: {
    marginTop: 5,
    fontSize: 10,
    color:'black'
  },
  locationText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
    maxWidth: 200,
  },
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '35%',
    height: '50%',
  },
  cloudImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  rowItem: {
    flexDirection: 'row',
  },
});

export default Headers;
