import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const LoadingFix = ({ source, style }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../Assets/Image/Auth/icon-aofix.png')} style={[styles.image, style]} />
      <View style={styles.logoTextContainer}>
        <Text style={styles.logoText}>AO FIX</Text>
        <Text style={styles.logoDesc}>YOUR FIX BUDDY</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
  logoDesc:{
    color:'#0000004D'
  }
});

export default LoadingFix;
