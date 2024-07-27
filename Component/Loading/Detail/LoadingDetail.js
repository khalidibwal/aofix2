import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const LoadingDetail = ({source, style}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.logoText}>Please Wait</Text>
      </View>
      <Image
        source={require('../../../Assets/Image/Detail/Icons/Loadings.png')}
        style={[styles.image, style]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.logoDesc}>
          Mohon Tunggu, Kami Sedang Menghubungkan Anda Dengan Mitra Kami
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add padding to avoid text being too close to edges
  },
  image: {
    width: 350, // Fixed size for better control
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20, // Space between image and text
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding for better text alignment
  },
  logoText: {
    color: 'black',
    fontSize: 25,
    fontWeight:'bold',
    textAlign: 'center',
    marginBottom: 10, // Space between title and description
  },
  logoDesc: {
    color: '#4B5563', // Slightly transparent black for better readability
    fontSize: 14,
    textAlign: 'center',
    width: 300, // Limit the width of the description text
  },
});

export default LoadingDetail;
