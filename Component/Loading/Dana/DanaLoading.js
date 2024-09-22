import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoadingScreen = () => {
  // You can add a state to control loading if needed
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    // Simulate a loading effect for 3 seconds
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('master')
    }, 5000);
  }, []);

  if (!loading) {
    return null; // Return null or your main content once loading is done
  }

  return (
    <View style={styles.container}>
      {/* Main logo centered */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../Assets/Image/Dana/Dana.png')} // Main logo
          style={styles.mainLogo}
        />
      </View>
  
      {/* Two logos and text in the same row */}
      <View style={styles.bottomContainer}>
        <Image
          source={require('../../../Assets/Image/Dana/BankBI.png')} // First logo
          style={styles.bottomLogo}
        />
        <Image
          source={require('../../../Assets/Image/Dana/kominfo2.png')} // Second logo
          style={styles.kominfoLogo}
        />
        <Text style={styles.bottomText}>
          Dana Indonesia terdaftar dan diawasi oleh Bank Indonesia dan Kominfo
        </Text>
      </View>
    </View>
  );
  
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0095D9',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainLogo: {
      width: 150, // Adjust size as needed
      height: 150,
    },
    bottomContainer: {
      flexDirection: 'row', // Keep logos and text in the same row
      justifyContent: 'center', // Center items horizontally
      alignItems: 'center',
      position: 'absolute',
      bottom: 20, // Adjust this to your desired bottom position
      left: 0,
      right: 0,
      paddingHorizontal: 10, // Add padding to the sides
    },
    bottomLogo: {
      width: 40, // Adjust size of bottom logos
      height: 40,
      tintColor: 'white',
      marginHorizontal: 10, // Space between logos and text
    },
    kominfoLogo:{
        width: 50, // Adjust size of bottom logos
        height: 50,
        tintColor: 'white',
        marginHorizontal: 10, // Space between logos and text
    },
    bottomText: {
      flex: 1, // Allow text to wrap
      fontSize: 11,
      color: '#fff',
      textAlign: 'left', // Align text to the left within its space
      marginLeft: 10, // Space between the second logo and text
    },
  });
  
  

export default LoadingScreen;
