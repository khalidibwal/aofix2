import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, BackHandler, PixelRatio } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  // Function to handle back button press
  const handleBackButtonPress = useCallback(() => {
    // Check if there are any pages to go back to
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true; // Prevent default back button behavior
    } else {
      Alert.alert(
        'Exit AO FIX',
        'Are you sure you want to exit AOFIX?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(), // Exit the app
          },
        ]
      );
      return true; // Prevent default back button behavior
    }
  }, [navigation]);

  // Set up the back button handler when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Add back button handler
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

      // Clean up the event listener on screen blur
      return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    }, [handleBackButtonPress])
  );

  const homePage = () => {
    navigation.navigate('HomeScreen');
  };

  const profilePage = () =>{
    navigation.navigate('Profile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleBackButtonPress}>
          <Image source={require('../../Assets/Image/Menu/Icons/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={homePage}>
          <Image source={require('../../Assets/Image/Menu/Icons/HomeIcons.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../Assets/Image/Menu/Icons/messages.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={profilePage}>
          <Image source={require('../../Assets/Image/Menu/Icons/avatarIcon2.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Fixed positioning
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop:50
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: PixelRatio.get() <= 2 ? 15 : 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MenuScreen;
