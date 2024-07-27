import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, BackHandler } from 'react-native';
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
        'Exit AOFIX',
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
        <TouchableOpacity style={styles.menuButton}>
          <Image source={require('../../Assets/Image/Menu/Icons/avatarIcon2.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  menuButton: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MenuScreen;
