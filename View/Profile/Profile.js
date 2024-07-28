import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
// import { authTokenState } from '../RecoilData/Auth/AuthRecoil';
import { authTokenState } from '../../Component/RecoilData/Auth/AuthRecoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showSnackbar } from '../../Component/Snackbar/SnackbarAlert';

const Profile = () => {
  const navigation = useNavigation();
  const [authToken, setAuthToken] = useRecoilState(authTokenState);

  const handleSignOut = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Clear the Recoil state
      setAuthToken(null);
      // Navigate to the login screen
      navigation.navigate('OpeningScreen');
    } catch (error) {
    //   console.error('Error signing out:', error);
    showSnackbar('error Signing out' + error, 4000)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  button: {
    width: '80%',
    backgroundColor: '#5BABE8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
