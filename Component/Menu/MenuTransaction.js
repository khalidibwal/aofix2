import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler, PixelRatio } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MenuTransaction = (props) => {
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

  const profilePage = () => {
    navigation.navigate('Profile');
  };
  const ChatPayment = () =>{
    navigation.navigate('Chats',{data: props.data})
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        {props.data !== null ?
        <TouchableOpacity style={styles.menuButton} onPress={ChatPayment}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> : 
        <TouchableOpacity style={styles.menuButton} onPress={profilePage}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>}
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
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4, // Blur radius of the shadow
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align items to the right
    width: '100%',
  },
  menuButton: {
    marginTop:5,
    marginHorizontal: 5,
    padding: PixelRatio.get() <= 2 ? 15 : 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#5194DB',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal:50
  },
});

export default MenuTransaction;
